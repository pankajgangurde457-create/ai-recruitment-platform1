import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#07080a] text-[#e2e2e9] font-body-base overflow-x-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-15%] w-[80%] h-[80%] bg-primary/10 blur-[180px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[#07080a]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <span className="font-headline-md text-xl font-bold tracking-tight text-white">HireFlow AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')} 
            className="px-5 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-5 py-2.5 bg-white text-[#07080a] hover:bg-white/90 text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-white/5"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-32 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-xs font-mono-technical uppercase tracking-widest text-primary font-semibold">Gemini 2.5 Pro Powered</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-6 max-w-4xl">
          Elite talent sourcing, powered by <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">autonomous AI</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-[#8a8b94] max-w-2xl mb-12">
          Say goodbye to hours of resume parsing and manual grading. HireFlow AI extracts skills, scores alignment, and schedules elite interviews instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => navigate('/signup')} 
            className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Get Started Immediately</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-white"
          >
            <span>Access Workspace</span>
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-[#0c0d12]/50 backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">document_scanner</span>
            <h3 className="text-xl font-bold text-white mb-2">Resume Parsing</h3>
            <p className="text-[#8a8b94] text-sm">
              Upload PDF and Word resumes. AI extracts contacts, technical skills, and years of experience automatically.
            </p>
          </div>
          {/* Card 2 */}
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-[#0c0d12]/50 backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">analytics</span>
            <h3 className="text-xl font-bold text-white mb-2">AI Match Score</h3>
            <p className="text-[#8a8b94] text-sm">
              Assess alignment with active jobs automatically. Receives breakdown report containing strengths, gaps, and weaknesses.
            </p>
          </div>
          {/* Card 3 */}
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-[#0c0d12]/50 backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">calendar_month</span>
            <h3 className="text-xl font-bold text-white mb-2">Interview Scheduler</h3>
            <p className="text-[#8a8b94] text-sm">
              Book dates, manage statuses, and generate personalized, contextual technical interview questions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-[#52535a] relative z-10">
        <p>&copy; {new Date().getFullYear()} HireFlow AI. All rights reserved. Premium enterprise grade SaaS platform.</p>
      </footer>
    </div>
  );
};
export default LandingPage;
