import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('Password reset request failed:', err);
      setError(err.message || 'Failed to send reset link. Try again.');
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
              <span className="material-symbols-outlined text-primary text-2xl">key</span>
            </div>
            <h1 className="font-display-lg text-2xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-sm text-on-surface-variant">Enter your email and we'll send you a link to reset your password.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-6">
              <span className="material-symbols-outlined text-green-400 text-5xl mb-4">check_circle</span>
              <h3 className="text-lg font-bold text-white mb-2">Link Sent Successfully</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Please check your inbox at <strong>{email}</strong> for instructions on how to reset your password.
              </p>
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleReset}>
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1" htmlFor="email">Email Address</label>
                <div className="group relative input-glow rounded-xl border border-white/10 bg-white/5 focus-within:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">mail</span>
                  <input 
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-0 text-sm" 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer text-sm disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>

              <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-on-surface-variant hover:text-white transition-colors">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};
export default ForgotPassword;
