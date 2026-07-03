import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase uses URL hash or query tokens after OAuth redirect.
    // getSession() will detect and exchange the token automatically.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#0B0D12] flex flex-col items-center justify-center text-[#e2e2e9]">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      <p className="font-mono-technical uppercase tracking-widest text-xs text-on-surface-variant animate-pulse">
        Completing Sign In...
      </p>
    </div>
  );
};

export default AuthCallback;
