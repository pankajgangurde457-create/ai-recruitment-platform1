import { Router, Response } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get all jobs
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*, recruiter:users(*)')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(jobs);
  } catch (err: any) {
    res.status(500).json({ error: 'Server job retrieval error' });
  }
});

// Get job detail
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: job, error } = await supabase
      .from('jobs')
      .select('*, recruiter:users(*), applications(*, candidates(*))')
      .eq('id', req.params.id)
      .single();

    if (error || !job) {
      res.status(404).json({ error: 'Job opening not found' });
      return;
    }

    res.json(job);
  } catch (err: any) {
    res.status(500).json({ error: 'Server job detail error' });
  }
});

// Create new job
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, department, location, type, experience_level, skills_required, salary_range, status } = req.body;
    
    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        title,
        description,
        department,
        location,
        type: type || 'Full-time',
        experience_level: experience_level || 'Mid',
        skills_required: skills_required || [],
        salary_range: salary_range || '',
        status: status || 'active',
        recruiter_id: req.user!.id
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: req.user!.id,
      action: 'Created job opening',
      target: title
    });

    res.status(201).json(job);
  } catch (err: any) {
    res.status(500).json({ error: 'Server job creation error' });
  }
});

// Update job
router.put('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, department, location, type, experience_level, skills_required, salary_range, status } = req.body;
    
    const { data: job, error } = await supabase
      .from('jobs')
      .update({
        title,
        description,
        department,
        location,
        type,
        experience_level,
        skills_required,
        salary_range,
        status
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: req.user!.id,
      action: 'Updated job opening',
      target: title
    });

    res.json(job);
  } catch (err: any) {
    res.status(500).json({ error: 'Server job update error' });
  }
});

// Delete job
router.delete('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: req.user!.id,
      action: 'Deleted job opening',
      target: req.params.id
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Server job deletion error' });
  }
});

export default router;
