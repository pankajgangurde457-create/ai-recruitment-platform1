import { Router, Response } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get all scheduled interviews
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('*, application:applications(*, candidate:candidates(*), job:jobs(*))')
      .order('date', { ascending: true });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(interviews);
  } catch (err: any) {
    res.status(500).json({ error: 'Server interview retrieval error' });
  }
});

// Schedule new interview
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { applicationId, date, durationMinutes, interviewerName, notes, generatedQuestions } = req.body;

    const { data: interview, error } = await supabase
      .from('interviews')
      .insert({
        application_id: applicationId,
        date,
        duration_minutes: durationMinutes || 45,
        interviewer_name: interviewerName,
        notes,
        generated_questions: generatedQuestions || [],
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Update application status to 'interview'
    await supabase
      .from('applications')
      .update({ status: 'interview' })
      .eq('id', applicationId);

    // Get candidate detail to write activity log
    const { data: appData } = await supabase
      .from('applications')
      .select('*, candidates(*)')
      .eq('id', applicationId)
      .single();

    await supabase.from('activity_logs').insert({
      user_id: req.user!.id,
      action: 'Scheduled interview',
      target: appData?.candidates?.name || 'Candidate'
    });

    res.status(201).json(interview);
  } catch (err: any) {
    res.status(500).json({ error: 'Server scheduling error' });
  }
});

// Update interview (status, notes, questions)
router.put('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, notes, date, durationMinutes, interviewerName, generatedQuestions } = req.body;
    
    const { data: interview, error } = await supabase
      .from('interviews')
      .update({
        status,
        notes,
        date,
        duration_minutes: durationMinutes,
        interviewer_name: interviewerName,
        generated_questions: generatedQuestions
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // If completed or cancelled, adjust application status accordingly
    if (status === 'completed') {
      const { data: app } = await supabase
        .from('interviews')
        .select('application_id')
        .eq('id', req.params.id)
        .single();
      if (app) {
        await supabase
          .from('applications')
          .update({ status: 'screening' }) // transition state or similar
          .eq('id', app.application_id);
      }
    }

    res.json(interview);
  } catch (err: any) {
    res.status(500).json({ error: 'Server update error' });
  }
});

// Cancel/Delete interview
router.delete('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Server deletion error' });
  }
});

export default router;
