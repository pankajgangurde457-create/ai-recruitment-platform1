import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // Validate with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({ error: 'Unauthorized: Invalid token session' });
      return;
    }

    // Load additional user role metadata from our public.users table if it exists
    const { data: dbUser } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    req.user = {
      id: user.id,
      email: user.email,
      role: dbUser?.role || 'recruiter'
    };

    next();
  } catch (err: any) {
    console.error('Authentication middleware error:', err);
    res.status(500).json({ error: 'Internal server error in authentication' });
  }
}
