import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already logged in, redirect them to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-surface-container-lowest text-[#e2e2e9] font-body-base">
      {/* Left Side: Brand & Visuals */}
      <section className="hidden md:flex md:w-1/2 h-full relative overflow-hidden bg-[#0b0d12] flex-col justify-between p-12">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full"></div>
        
        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined text-[#07080a]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-white">HireFlow AI</span>
        </div>
        
        {/* Central Illustration */}
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="floating-ai relative">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-125"></div>
            <span className="material-symbols-outlined text-[160px] text-primary relative z-10 animate-pulse">lock</span>
          </div>
        </div>
        
        {/* Description */}
        <div className="relative z-10 max-w-sm">
          <h2 className="font-headline-md text-headline-md font-bold mb-2">Elite recruitment powered by next-gen intelligence.</h2>
          <p className="font-body-base text-body-base text-on-surface-variant/80">Streamline your hiring pipeline with precision AI that identifies top talent 10x faster than traditional tools.</p>
        </div>
      </section>

      {/* Right Side: Login Panel */}
      <section className="w-full md:w-1/2 h-full flex items-center justify-center px-6 relative">
        {/* Mobile Background Elements */}
        <div className="md:hidden absolute inset-0 bg-[#0b0d12] -z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #4816cb, transparent)' }}></div>
        </div>
        
        {/* Login Card */}
        <div className="glass-card w-full max-w-[480px] p-8 md:p-12 rounded-2xl relative overflow-hidden bg-white/5 border border-white/10">
          <div className="relative z-10">
            <header className="mb-8">
              <h1 className="font-display-lg text-headline-md md:text-display-lg font-bold text-white mb-2">Welcome Back</h1>
              <p className="font-body-base text-body-base text-on-surface-variant">Enter your details to access your workspace.</p>
            </header>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-on-surface-variant ml-1 uppercase" htmlFor="email">Email Address</label>
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
              
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-caps text-xs text-on-surface-variant uppercase" htmlFor="password">Password</label>
                  <Link className="text-xs text-primary hover:underline font-semibold" to="/forgot-password">Forgot Password?</Link>
                </div>
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
              
              {/* CTA Button */}
              <button 
                className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-[1px] flex-grow bg-white/10"></div>
              <span className="font-label-caps text-xs text-outline uppercase">Or continue with</span>
              <div className="h-[1px] flex-grow bg-white/10"></div>
            </div>
            
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer text-xs font-semibold text-white"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                </svg>
                Google
              </button>
              
              <Link 
                to="/signup"
                className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer text-xs font-semibold text-primary text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;
