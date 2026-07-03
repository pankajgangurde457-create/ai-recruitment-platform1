import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Password update failed:', err);
      setError(err.message || 'Failed to update password. Session may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-[#07080a] text-[#e2e2e9] font-body-base px-6 relative">
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="glass-card w-full max-w-[440px] p-8 md:p-12 rounded-2xl relative overflow-hidden bg-white/5 border border-white/10">
        <div className="relative z-10">
          <header className="mb-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
            </div>
            <h1 className="font-display-lg text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-sm text-on-surface-variant">Enter your new secure password below.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-6">
              <span className="material-symbols-outlined text-green-400 text-5xl mb-4">check_circle</span>
              <h3 className="text-lg font-bold text-white mb-2">Password Updated!</h3>
              <p className="text-sm text-on-surface-variant">
                Your password has been changed successfully. You will be redirected to the sign-in page in a few seconds...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleUpdate}>
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1" htmlFor="password">New Password</label>
                <div className="group relative input-glow rounded-xl border border-white/10 bg-white/5 focus-within:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-0 text-sm" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1" htmlFor="confirmPassword">Confirm Password</label>
                <div className="group relative input-glow rounded-xl border border-white/10 bg-white/5 focus-within:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-0 text-sm" 
                    id="confirmPassword" 
                    placeholder="••••••••" 
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer text-sm disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};
export default ResetPassword;
