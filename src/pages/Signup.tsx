import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'recruiter' | 'executive'>('recruiter');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect them to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (signupError) {
        throw signupError;
      }

      if (data?.user && data.session === null) {
        // Verification email sent
        setSuccess(true);
      } else if (data?.user && data.session) {
        // Signed up and auto-logged in
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-surface-container-lowest text-[#e2e2e9] font-body-base">
      {/* Left Panel */}
      <section className="hidden md:flex md:w-1/2 h-full relative overflow-hidden bg-[#0b0d12] flex-col justify-between p-12">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[#07080a]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-white">HireFlow AI</span>
        </div>

        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="floating-ai relative">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-125"></div>
            <span className="material-symbols-outlined text-[160px] text-primary relative z-10 animate-pulse">person_add</span>
          </div>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="font-headline-md text-headline-md font-bold mb-2">Build your elite workspace today.</h2>
          <p className="font-body-base text-body-base text-on-surface-variant/80">Configure team properties, manage candidates, and integrate your calendar pipeline effortlessly.</p>
        </div>
      </section>

      {/* Right Panel */}
      <section className="w-full md:w-1/2 h-full flex items-center justify-center px-6 relative overflow-y-auto py-12">
        <div className="glass-card w-full max-w-[480px] p-8 md:p-12 rounded-2xl relative overflow-hidden bg-white/5 border border-white/10">
          <div className="relative z-10">
            <header className="mb-8">
              <h1 className="font-display-lg text-headline-md md:text-display-lg font-bold text-white mb-2">Create Account</h1>
              <p className="font-body-base text-body-base text-on-surface-variant">Sign up to get access to HireFlow AI workspace.</p>
            </header>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-green-400 text-5xl mb-4">mail</span>
                <h3 className="text-lg font-bold text-white mb-2">Verification Sent</h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  We have sent a verification link to <strong>{email}</strong>. Please check your inbox and verify your account to proceed.
                </p>
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSignup}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1" htmlFor="name">Full Name</label>
                  <div className="group relative input-glow rounded-xl border border-white/10 bg-white/5 focus-within:border-primary transition-all duration-300">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">person</span>
                    <input 
                      className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-0 text-sm" 
                      id="name" 
                      placeholder="Jane Doe" 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Address */}
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

                {/* Password */}
                <div className="space-y-2">
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1" htmlFor="password">Password</label>
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

                {/* Workspace Role */}
                <div className="space-y-2">
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase ml-1">Workspace Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['recruiter', 'executive', 'admin'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all uppercase tracking-wide cursor-pointer ${
                          role === r 
                            ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(181,196,255,0.2)]'
                            : 'bg-white/5 border-white/10 text-on-surface-variant hover:border-white/20'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button 
                  className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer text-sm disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-center text-xs text-on-surface-variant mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-semibold">
                    Sign In
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Signup;
