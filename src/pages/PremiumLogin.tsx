import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PremiumLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/executive');
  };

  const navigateToStandard = () => {
    navigate('/login');
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-surface-container-lowest text-[#e2e2e9] font-body-base">
      {/* Left Side: Brand & Visuals */}
      <section className="hidden md:flex md:w-1/2 h-full relative overflow-hidden bg-[#0b0d12] flex-col justify-between p-16">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-on-secondary-fixed-variant/10 blur-[140px] rounded-full"></div>
        
        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-on-secondary-fixed-variant flex items-center justify-center shadow-2xl shadow-primary/25">
            <span className="material-symbols-outlined text-on-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <span className="font-headline-md text-2xl font-bold tracking-tight text-on-surface">HireFlow AI</span>
        </div>
        
        {/* Central Illustration */}
        <div className="relative z-10 flex-grow flex items-center justify-center py-12">
          <div className="floating-ai relative max-w-lg w-full">
            {/* Layered glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-110 opacity-60"></div>
            <img 
              alt="AI Recruitment Illustration" 
              className="w-full h-auto drop-shadow-[0_0_80px_rgba(181,196,255,0.4)] object-contain relative z-10 rounded-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWqVSbtOmewHA10iIGJeQYlCQxKxc-gl1C8TwPnW4Qqf08KVf1HpFmrtP6FwCUM_Nshe5_4ixhD2Bv4vMTVpUY4tLFt3OexcQTevWVaLYdOf3vnWQqZreTsnr8JsaUM1NPuThRw6uqRY2bn4XVK4jf6LYunBzEg8xQ43mGZ_C_L9RjZNqfbQk1MsAVJDhNI0DPy4c18-BRNRD4RBFdarbxDxWcc23xEI30TRZ2T5x1jtbuPvgM0mucS5kEkQjhb5vbRP3VijgAxmdq"
            />
          </div>
        </div>
        
        {/* Branding Content */}
        <div className="relative z-10 max-w-md">
          <h2 className="font-display-lg text-4xl font-bold mb-4 leading-tight">AI-Powered Recruitment Platform</h2>
          <p className="font-body-base text-lg text-on-surface-variant/70 leading-relaxed">
            Automate hiring with AI-powered resume screening, candidate ranking, interview scheduling, and recruitment workflows.
          </p>
        </div>
      </section>

      {/* Right Side: Login Panel */}
      <section className="w-full md:w-1/2 h-full flex items-center justify-center px-6 relative bg-surface-container-lowest">
        {/* Mobile Background Elements */}
        <div className="md:hidden absolute inset-0 bg-[#0b0d12] -z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #4816cb, transparent)' }}></div>
        </div>
        
        {/* Login Card */}
        <div className="glass-card w-full max-w-[520px] p-8 md:p-14 rounded-2xl relative overflow-hidden">
          {/* Subtle Shimmer Overlay */}
          <div className="shimmer absolute inset-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <header className="mb-10">
              <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-3">Welcome Back</h1>
              <p className="font-body-base text-on-surface-variant/80">Enter your credentials to access your dashboard.</p>
            </header>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2.5">
                <label className="font-label-caps text-xs text-on-surface-variant/70 ml-1 uppercase tracking-widest" htmlFor="email">Email Address</label>
                <div className="group relative input-glow rounded-xl border border-outline-variant/40 bg-surface-container-low transition-all duration-300">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary text-xl">mail</span>
                  <input 
                    className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-0 font-body-base" 
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
              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-caps text-xs text-on-surface-variant/70 uppercase tracking-widest" htmlFor="password">Password</label>
                  <a className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
                </div>
                <div className="group relative input-glow rounded-xl border border-outline-variant/40 bg-surface-container-low transition-all duration-300">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary text-xl">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/50 focus:ring-0 font-body-base" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/60 hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center gap-3 py-1">
                <input 
                  className="w-5 h-5 rounded border-outline-variant/40 bg-surface-container-high text-primary-container focus:ring-primary focus:ring-offset-surface-container-lowest transition-all cursor-pointer" 
                  id="remember" 
                  type="checkbox"
                />
                <label className="font-body-base text-sm text-on-surface-variant select-none cursor-pointer" htmlFor="remember">Keep me signed in</label>
              </div>
              
              {/* CTA Button */}
              <button 
                className="magnetic-btn w-full bg-gradient-to-r from-primary-container to-secondary-container hover:brightness-110 text-on-primary-container font-bold py-4 rounded-xl shadow-xl shadow-primary-container/10 transition-all active:scale-[0.98] cursor-pointer" 
                type="submit"
              >
                Sign In
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
              <span className="font-label-caps text-[10px] text-outline/60 uppercase tracking-[0.2em] whitespace-nowrap">Or continue with</span>
              <div className="h-[1px] flex-grow bg-outline-variant/20"></div>
            </div>
            
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleSubmit}
                className="social-btn flex items-center justify-center gap-3 py-3.5 rounded-xl bg-surface-container-high/40 border border-outline-variant/20 text-on-surface font-medium transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                </svg>
                Google
              </button>
              
              <button 
                onClick={navigateToStandard}
                type="button"
                className="social-btn flex items-center justify-center py-3.5 rounded-xl bg-surface-container-high/40 border border-outline-variant/20 text-primary font-semibold transition-all cursor-pointer text-sm"
              >
                Standard view
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default PremiumLogin;
