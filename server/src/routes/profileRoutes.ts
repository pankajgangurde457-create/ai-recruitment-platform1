import { Router, Response } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get profile of currently authenticated recruiter
router.get('/profile', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user!.id)
      .single();

    if (error || !userProfile) {
      res.status(404).json({ error: 'Recruiter profile not found' });
      return;
    }

    res.json(userProfile);
  } catch (err: any) {
    res.status(500).json({ error: 'Server profile fetch error' });
  }
});

// Update profile of currently authenticated recruiter
router.put('/profile', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, avatar_url } = req.body;

    const { data: updatedProfile, error } = await supabase
      .from('users')
      .update({ name, avatar_url })
      .eq('id', req.user!.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(updatedProfile);
  } catch (err: any) {
    res.status(500).json({ error: 'Server profile update error' });
  }
});

// Admin Panel: Get all users and system activities (only accessible by 'admin')
router.get('/admin/activities', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    const { data: activities, error: actErr } = await supabase
      .from('activity_logs')
      .select('*, user:users(*)')
      .order('created_at', { ascending: false });

    const { data: allUsers, error: userErr } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (actErr || userErr) {
      res.status(500).json({ error: actErr?.message || userErr?.message });
      return;
    }

    res.json({ activities, users: allUsers });
  } catch (err: any) {
    res.status(500).json({ error: 'Server admin fetch error' });
  }
});

// Admin Panel: Update user role
router.put('/admin/users/:id/role', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    const { role } = req.body;
    if (!['admin', 'recruiter', 'executive'].includes(role)) {
      res.status(400).json({ error: 'Invalid role specified' });
      return;
    }

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: 'Server role update error' });
  }
});

export default router;
