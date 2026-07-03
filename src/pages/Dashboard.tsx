import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../hooks/aiService';
import { HolographicOrb } from '../components/HolographicOrb';

interface StatsOverview {
  activeJobs: number;
  totalCandidates: number;
  pendingInterviews: number;
  avgMatchScore: number;
}

interface ActivityLog {
  id: string;
  action: string;
  target?: string;
  created_at: string;
  user?: {
    name: string;
  };
}

export const Dashboard: React.FC = () => {
  const { session, profile } = useAuth();
  const [stats, setStats] = useState<StatsOverview>({
    activeJobs: 0,
    totalCandidates: 0,
    pendingInterviews: 0,
    avgMatchScore: 0
  });

  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [askAI, setAskAI] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; parts: { text: string }[] }>>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const handleSeedData = async () => {
    if (!session || seeding) return;
    setSeeding(true);
    try {
      const response = await fetch(`${API_URL}/api/analytics/seed`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Seeding failed' }));
        throw new Error(errData.error || 'Seeding action failed');
      }
      alert('Demo recruitment workspace seeded successfully!');
      window.location.reload();
    } catch (err: any) {
      alert(`Error seeding workspace: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!session) return;
      try {
        const response = await fetch(`${API_URL}/api/analytics/overview`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to retrieve analytics');
        }
        const data = await response.json();
        setStats(data.summary);
        setRecentActivities(data.recentActivities || []);
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [session]);

  const handleSendAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!askAI.trim() || isAIResponding) return;

    const userText = askAI;
    setAskAI('');
    
    // Add user message to history
    const userMsg = { role: 'user' as const, parts: [{ text: userText }] };
    setMessages(prev => [...prev, userMsg]);
    setIsAIResponding(true);

    try {
      // Call backend AI Assistant
      const response = await aiService.chatWithAI(userText, [...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'model' as const, parts: [{ text: response }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model' as const, parts: [{ text: 'Error communicating with AI service.' }] }]);
    } finally {
      setIsAIResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Aligning workspace state...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="text-[11px] font-bold tracking-widest uppercase">AI Intelligence Active</span>
          </div>
          <h2 className="font-display-lg text-4xl font-extrabold leading-tight text-white">
            Welcome back, <span className="text-primary">{profile?.name || 'Recruiter'}</span>.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Your workspace is active. You have {stats.pendingInterviews} scheduled screenings and {stats.activeJobs} active job listings.
          </p>
        </div>

        <div className="w-full md:w-[360px] h-[280px] relative">
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_0_40px_rgba(181,196,255,0.2)]">
            <HolographicOrb />
          </div>
        </div>
      </section>

      {/* Empty State Seed Workspace Banner */}
      {stats.activeJobs === 0 && stats.totalCandidates === 0 && (
        <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">cloud_sync</span>
              Empty Recruiter Workspace
            </h3>
            <p className="text-sm text-on-surface-variant max-w-xl">
              Get started instantly! Seed your workspace with sample jobs, candidates with parsed compatibility reports, and initial interview events.
            </p>
          </div>
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-xl font-bold transition-all text-sm cursor-pointer shadow-lg shadow-primary/25 whitespace-nowrap disabled:opacity-50"
          >
            {seeding ? 'Seeding Workspace...' : 'Seed Demo Workspace'}
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="glass-card p-8 flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined">work</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-semibold uppercase text-xs">Active Job Listings</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-white">{stats.activeJobs}</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-8 flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-2">
            <span className="material-symbols-outlined">person_search</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-semibold uppercase text-xs">Candidates In Database</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-white">{stats.totalCandidates}</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-8 flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary mb-2">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-semibold uppercase text-xs">Average Match Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-white">{stats.avgMatchScore}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Activities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Workspace Activity Feed</h3>
            
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-white">{act.action}</h4>
                    <p className="text-xs text-on-surface-variant">Target: {act.target || '-'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant">{act.user?.name || 'Recruiter'}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{new Date(act.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <p className="text-sm text-on-surface-variant text-center py-6">No recent actions recorded.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant Chatbot */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-h-[400px] shadow-[0_0_30px_rgba(181,196,255,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="text-lg font-bold text-white font-headline-md">HireFlow AI Assistant</h3>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar text-xs">
              {messages.length === 0 ? (
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-on-surface-variant leading-relaxed">
                  Hi, I am HireFlow AI assistant. Ask me anything about candidate summaries, resume matching score alignment, or sourcing strategies!
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-xl border border-white/5 leading-relaxed ${
                      msg.role === 'model' ? 'bg-primary/10 border-primary/25 text-white' : 'bg-white/5 text-on-surface-variant'
                    }`}
                  >
                    <p className="font-bold text-[10px] uppercase mb-1">
                      {msg.role === 'model' ? 'AI Assistant' : 'You'}
                    </p>
                    <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                  </div>
                ))
              )}

              {isAIResponding && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl animate-pulse">
                  <p className="text-[10px] font-bold text-primary uppercase">AI Assistant</p>
                  <p className="text-on-surface-variant text-xs mt-1">Thinking...</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSendAI} className="mt-6 pt-4 border-t border-white/5">
              <div className="relative">
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-primary text-white" 
                  placeholder="Ask AI Assistant..." 
                  type="text"
                  value={askAI}
                  onChange={(e) => setAskAI(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
