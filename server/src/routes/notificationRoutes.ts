import { Router, Response } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get notifications
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(notifications);
  } catch (err: any) {
    res.status(500).json({ error: 'Server notifications retrieval error' });
  }
});

// Mark notification as read
router.put('/:id/read', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', req.params.id)
      .eq('user_id', req.user!.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(notification);
  } catch (err: any) {
    res.status(500).json({ error: 'Server notification update error' });
  }
});

// Mark all notifications as read
router.put('/read-all', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', req.user!.id)
      .select();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ success: true, count: data?.length || 0 });
  } catch (err: any) {
    res.status(500).json({ error: 'Server update all error' });
  }
});

export default router;
