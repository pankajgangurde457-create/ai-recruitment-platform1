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

export default router;
