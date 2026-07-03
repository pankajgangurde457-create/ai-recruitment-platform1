import { Router, Response } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get core dashboard stats
router.get('/overview', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Fetch counts
    const { count: jobsCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active');
    const { count: candidatesCount } = await supabase.from('candidates').select('*', { count: 'exact', head: true });
    const { count: interviewsCount } = await supabase.from('interviews').select('*', { count: 'exact', head: true }).eq('status', 'scheduled');
    
    // 2. Fetch application statuses distribution
    const { data: apps } = await supabase.from('applications').select('status, match_score');
    
    const statusDistribution = (apps || []).reduce((acc: Record<string, number>, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    // Calculate average score
    const scores = (apps || []).map(a => a.match_score).filter(s => s > 0);
    const avgMatchScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    // 3. Fetch recent activities
    const { data: recentActivities } = await supabase
      .from('activity_logs')
      .select('*, user:users(*)')
      .order('created_at', { ascending: false })
      .limit(10);

    // 4. Monthly application trends (mocked grouping based on DB created_at is fine, or simple count)
    const trends = [
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 19 },
      { month: 'Mar', count: 32 },
      { month: 'Apr', count: 48 },
      { month: 'May', count: 65 },
      { month: 'Jun', count: 85 }
    ];

    res.json({
      summary: {
        activeJobs: jobsCount || 0,
        totalCandidates: candidatesCount || 0,
        pendingInterviews: interviewsCount || 0,
        avgMatchScore
      },
      statusDistribution,
      recentActivities: recentActivities || [],
      trends
    });
  } catch (err: any) {
    console.error('Analytics fetch error:', err);
    res.status(500).json({ error: 'Server analytics retrieval error' });
  }
});

// Get detailed PDF/CSV printable reports
router.get('/reports', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: applications } = await supabase
      .from('applications')
      .select('*, candidate:candidates(*), job:jobs(*)');
    res.json(applications || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Server reports error' });
  }
});

// Seed sample recruitment data for demo purposes
router.post('/seed', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const recruiterId = req.user!.id;

    // Check if jobs already exist for this recruiter
    const { count: jobCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('recruiter_id', recruiterId);

    if (jobCount && jobCount > 0) {
      res.status(400).json({ error: 'Workspace already contains active jobs. Seeding skipped.' });
      return;
    }

    // 1. Create sample jobs
    const jobsToInsert = [
      {
        title: 'Senior Frontend Engineer',
        description: 'We are looking for a senior developer skilled in React, TypeScript, and state management frameworks to build our next-generation UI.',
        department: 'Engineering',
        location: 'Remote',
        type: 'Remote',
        experience_level: 'Senior',
        skills_required: ['React', 'TypeScript', 'CSS', 'Redux'],
        salary_range: '$120,000 - $150,000',
        status: 'active',
        recruiter_id: recruiterId
      },
      {
        title: 'Product Designer (UI/UX)',
        description: 'Join our design team to craft beautiful workflows, user journeys, and premium dark-mode interfaces in Figma.',
        department: 'Design',
        location: 'Remote',
        type: 'Remote',
        experience_level: 'Mid',
        skills_required: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping'],
        salary_range: '$90,000 - $110,000',
        status: 'active',
        recruiter_id: recruiterId
      }
    ];

    const { data: insertedJobs, error: jobsError } = await supabase
      .from('jobs')
      .insert(jobsToInsert)
      .select();

    if (jobsError || !insertedJobs || insertedJobs.length < 2) {
      res.status(500).json({ error: 'Failed to seed jobs: ' + (jobsError?.message || 'unknown error') });
      return;
    }

    const reactJob = insertedJobs[0];
    const designJob = insertedJobs[1];

    // 2. Create sample candidates (ensure email uniqueness using timestamp)
    const suffix = Date.now().toString().slice(-4);
    const candidatesToInsert = [
      {
        name: 'Sarah Connor',
        email: `sarah.c.${suffix}@skynet-recruitment.com`,
        phone: '+1 555-8902',
        skills: ['React', 'TypeScript', 'Node.js', 'Redux', 'GraphQL'],
        experience_years: 6,
        education: 'BS in Computer Science',
        summary: 'Passionate frontend engineer focused on performant web apps, responsive layouts, and typed code architectures.'
      },
      {
        name: 'Jordan Walke',
        email: `jordan.w.${suffix}@reactdev.com`,
        phone: '+1 555-7321',
        skills: ['React', 'Figma', 'UI/UX', 'TypeScript'],
        experience_years: 4,
        education: 'BFA in Digital Design',
        summary: 'UX-oriented designer and developer bridging the gap between pixel-perfect mockups and functional React interfaces.'
      }
    ];

    const { data: insertedCandidates, error: candError } = await supabase
      .from('candidates')
      .insert(candidatesToInsert)
      .select();

    if (candError || !insertedCandidates || insertedCandidates.length < 2) {
      res.status(500).json({ error: 'Failed to seed candidates: ' + (candError?.message || 'unknown error') });
      return;
    }

    const candidate1 = insertedCandidates[0];
    const candidate2 = insertedCandidates[1];

    // 3. Create applications mapping candidates to jobs
    const appsToInsert = [
      {
        job_id: reactJob.id,
        candidate_id: candidate1.id,
        status: 'screening',
        match_score: 95
      },
      {
        job_id: designJob.id,
        candidate_id: candidate2.id,
        status: 'applied',
        match_score: 82
      }
    ];

    const { data: insertedApps, error: appsError } = await supabase
      .from('applications')
      .insert(appsToInsert)
      .select();

    if (appsError || !insertedApps || insertedApps.length < 2) {
      res.status(500).json({ error: 'Failed to seed applications: ' + (appsError?.message || 'unknown error') });
      return;
    }

    // 4. Create resume scores
    const scoresToInsert = [
      {
        candidate_id: candidate1.id,
        score: 95,
        summary: 'Excellent technical matches for state management and functional components. Possesses rich background in scaling single-page applications.',
        strengths: ['Expert in React and Redux lifecycle details', 'Strong TypeScript typing discipline'],
        weaknesses: ['Minimal cloud infrastructure management experience'],
        skill_gap: ['TailwindCSS']
      },
      {
        candidate_id: candidate2.id,
        score: 82,
        summary: 'Capable designer with strong developer handoff habits. Demonstrates robust design system fluency.',
        strengths: ['High proficiency in Figma components and variables', 'Familiar with React client building blocks'],
        weaknesses: ['Limited formal background in server-side API layout'],
        skill_gap: ['Prototyping tools like Principle/Protopie']
      }
    ];

    await supabase.from('resume_scores').insert(scoresToInsert);

    // 5. Create a sample notification
    await supabase.from('notifications').insert({
      user_id: recruiterId,
      message: 'Demo Workspace Seeded Successfully! Review matches in your Pipeline.',
      type: 'success',
      read: false
    });

    // 6. Log activity
    await supabase.from('activity_logs').insert({
      user_id: recruiterId,
      action: 'Seeded demo candidates and jobs workspace',
      details: 'Created 2 jobs, 2 candidates, and scores'
    });

    res.json({ success: true, message: 'Demo data workspace loaded successfully!' });
  } catch (err: any) {
    console.error('Seeding error:', err);
    res.status(500).json({ error: 'Server database seeding error' });
  }
});

export default router;
