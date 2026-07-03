import { Router, Response } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { parseResume, scoreResume, generateInterviewQuestions } from '../services/geminiService.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed') as any, false);
    }
  }
});

// Helper to log activities
async function logActivity(userId: string, action: string, target?: string) {
  try {
    await supabase.from('activity_logs').insert({ user_id: userId, action, target });
  } catch (err) {
    console.error('Failed to write activity log:', err);
  }
}

// 1. Upload & Parse Resume
router.post('/upload', requireAuth, upload.single('resume'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No resume file uploaded' });
      return;
    }

    let resumeText = '';
    const fileBuffer = req.file.buffer;

    if (req.file.mimetype === 'application/pdf') {
      const parsedPdf = await pdf(fileBuffer);
      resumeText = parsedPdf.text;
    } else {
      const parsedDoc = await mammoth.extractRawText({ buffer: fileBuffer });
      resumeText = parsedDoc.value;
    }

    if (!resumeText || resumeText.trim().length === 0) {
      res.status(400).json({ error: 'Could not extract text from the file' });
      return;
    }

    // Call Gemini AI parser
    const parsedData = await parseResume(resumeText);

    // Save candidate to DB
    const { data: candidate, error: dbError } = await supabase
      .from('candidates')
      .insert({
        name: parsedData.name || 'Unknown Candidate',
        email: parsedData.email || `imported-${Date.now()}@hireflow.internal`,
        phone: parsedData.phone || '',
        skills: parsedData.skills || [],
        experience_years: parsedData.experience_years || 0,
        education: parsedData.education || '',
        summary: parsedData.summary || '',
        resume_url: `memory://${req.file.originalname}`,
        metadata: { original_filename: req.file.originalname }
      })
      .select()
      .single();

    if (dbError) {
      // If candidate already exists, let's update them
      if (dbError.code === '23505') { // Unique violation on email
        const { data: existing, error: updateError } = await supabase
          .from('candidates')
          .update({
            name: parsedData.name || 'Unknown Candidate',
            phone: parsedData.phone || '',
            skills: parsedData.skills || [],
            experience_years: parsedData.experience_years || 0,
            education: parsedData.education || '',
            summary: parsedData.summary || '',
            resume_url: `memory://${req.file.originalname}`,
            metadata: { original_filename: req.file.originalname }
          })
          .eq('email', parsedData.email)
          .select()
          .single();

        if (updateError) {
          res.status(500).json({ error: `Database update failed: ${updateError.message}` });
          return;
        }

        await logActivity(req.user!.id, 'Updated candidate profile from resume', existing.name);
        res.json({ candidate: existing, isNew: false });
        return;
      }

      res.status(500).json({ error: `Database insert failed: ${dbError.message}` });
      return;
    }

    await logActivity(req.user!.id, 'Uploaded and parsed candidate resume', candidate.name);
    res.json({ candidate, isNew: true });
  } catch (err: any) {
    console.error('Resume upload error:', err);
    res.status(500).json({ error: err.message || 'Error processing resume file' });
  }
});

// 2. Score Candidate against Job Requirement
router.post('/:id/apply-and-score', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const candidateId = req.params.id;
    const { jobId } = req.body;

    if (!jobId) {
      res.status(400).json({ error: 'Job ID is required' });
      return;
    }

    // 1. Fetch Candidate and Job details
    const { data: candidate, error: candErr } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', candidateId)
      .single();

    const { data: job, error: jobErr } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (candErr || !candidate) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }
    if (jobErr || !job) {
      res.status(404).json({ error: 'Job opening not found' });
      return;
    }

    // 2. Run Gemini scoring service
    const evaluation = await scoreResume(
      candidate.skills,
      candidate.experience_years,
      job.title,
      job.skills_required,
      job.description
    );

    // 3. Store Application relationship
    const { data: application, error: appErr } = await supabase
      .from('applications')
      .upsert({
        job_id: jobId,
        candidate_id: candidateId,
        match_score: evaluation.score,
        status: 'applied'
      }, { onConflict: 'job_id,candidate_id' })
      .select()
      .single();

    if (appErr) {
      res.status(500).json({ error: `Failed to create application: ${appErr.message}` });
      return;
    }

    // 4. Store details in Resume Scores table
    await supabase.from('resume_scores').insert({
      candidate_id: candidateId,
      score: evaluation.score,
      summary: evaluation.summary,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      skill_gap: evaluation.skill_gap
    });

    // 5. Generate Tailored interview questions in the background
    const questions = await generateInterviewQuestions(
      evaluation.summary,
      candidate.skills,
      job.title,
      job.description
    );

    // Write a notification for the recruiter
    await supabase.from('notifications').insert({
      user_id: req.user!.id,
      message: `Candidate ${candidate.name} matched ${evaluation.score}% for job ${job.title}`,
      type: evaluation.score >= 80 ? 'success' : 'info'
    });

    await logActivity(req.user!.id, `Matched candidate to role with ${evaluation.score}% score`, `${candidate.name} -> ${job.title}`);

    res.json({
      application,
      evaluation,
      suggestedQuestions: questions
    });
  } catch (err: any) {
    console.error('Job match scoring error:', err);
    res.status(500).json({ error: err.message || 'Error executing AI scoring' });
  }
});

// 3. Get all candidates list
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: candidates, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(candidates);
  } catch (err: any) {
    res.status(500).json({ error: 'Server retrieval error' });
  }
});

// 4. Get specific candidate detail
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const candidateId = req.params.id;
    const { data: candidate, error } = await supabase
      .from('candidates')
      .select('*, resume_scores(*), applications(*, jobs(*))')
      .eq('id', candidateId)
      .single();

    if (error || !candidate) {
      res.status(404).json({ error: 'Candidate profile not found' });
      return;
    }

    res.json(candidate);
  } catch (err: any) {
    res.status(500).json({ error: 'Server retrieval error' });
  }
});

// 5. Update candidate manually
router.put('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, phone, skills, experience_years, education, summary } = req.body;
    const { data: candidate, error } = await supabase
      .from('candidates')
      .update({ name, email, phone, skills, experience_years, education, summary })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    await logActivity(req.user!.id, 'Manually updated candidate profile', candidate.name);
    res.json(candidate);
  } catch (err: any) {
    res.status(500).json({ error: 'Server update error' });
  }
});

// 6. Delete candidate
router.delete('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    await logActivity(req.user!.id, 'Deleted candidate profile', req.params.id as string);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Server deletion error' });
  }
});

// Update Application Status
router.put('/applications/:appId/status', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'].includes(status)) {
      res.status(400).json({ error: 'Invalid application status' });
      return;
    }

    const { data: app, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', req.params.appId)
      .select('*, candidate:candidates(*), job:jobs(*)')
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    await logActivity(req.user!.id, `Updated candidate application status to ${status}`, app.candidate?.name);
    res.json(app);
  } catch (err: any) {
    res.status(500).json({ error: 'Server status update error' });
  }
});

export default router;
