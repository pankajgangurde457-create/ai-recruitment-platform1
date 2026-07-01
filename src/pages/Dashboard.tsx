import React, { useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { HolographicOrb } from '../components/HolographicOrb';
import { aiService } from '../hooks/aiService';

export const Dashboard: React.FC = () => {
  const openPositionsCount = useCountUp(12);
  const candidatesCount = useCountUp(482);
  const successRateCount = useCountUp(94);
  const [askAI, setAskAI] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);

  const handleSendAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!askAI.trim() || isAIResponding) return;

    const userText = askAI;
    setAskAI('');
    
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsAIResponding(true);

    try {
      const response = await aiService.chatWithAI(userText);
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error communicating with AI service.' }]);
    } finally {
      setIsAIResponding(false);
    }
  };

  const recentCandidates = [
    {
      name: 'Alex Rivera',
      location: 'San Francisco, CA',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAjG1Z9gW4BuvlfSFMNIrTHhpnmBiYxqnIxVes_Q5-HXNzrNbfjxb7Y4gURuus3Ki1DSoYdw4suzYzRoe8jJSHotQ9hs45qdokc7T6pj4YcxZICvf1ixDHKg6d0G-tuJsJICVb2Ae-UwGciga1HxxXODcv_tHvoKEuJjAlawX5S6iNv7L6JQGlb7_VIhJu_2rwemqncDfXSBksDha27fogmobtGQzA5EnqKTkO11UNxDrqfIQTm0FxPjz6YCnE9A9iMHPB6N7S4Fzv',
      role: 'Staff Product Designer',
      match: '98%',
      matchVal: 98,
      status: 'Initial Screen',
    },
    {
      name: 'Jordan Smith',
      location: 'Austin, TX',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAxKBnIeiX9_AAwold1w1x87K4HLZGEookourM7UQFze3h-McQEBHaRFThzsgZ0udTno9le-k_Hj1CMe1fVNagNQYLH1KM8coE5t1kvSNXHFx4jPFeW9F13Hu_brCQuqBuqbCWuUcrybRUggXJjyhVPZ91fUqfwyxWRHo9DfezeqNF3vJZMZbaKoSI_roW4vcWH8-hFSDufa7XVSz81JO_ESzRj49X6se1FBqUPDUBggKrCR-T5QbzS7KRsBHvKNAMXlRQc1y5K0h-',
      role: 'Sr. Machine Learning Eng',
      match: '94%',
      matchVal: 94,
      status: 'Technical Interview',
      isTertiary: true,
    },
    {
      name: 'Chen Wei',
      location: 'New York, NY',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv7HzzfopnxxKbCK43e-Fpk1uEPDIvqcMQ8KFbV0RE0F0tV8JFJS7d4Vuza93zhFNZA9IxbsD6esYq0HydSS5hINC5nZAoNUF3GTopN4HWqhqW0Mztp1-KcmfASs6dG26gaPM4hyhGC9J_EB3qbVc-HBi3pTFRkzTj1YaYz4_PpBZ8UkewzEFiWKjYkC5Gu_ou5MR1pkE1oiHteVuIDGpg6-uzIW5kQlPsOjrzAB7hMFDFh9CV1xpTfCEPsTtIChv9iPLJ75sKcJpY',
      role: 'VP of Engineering',
      match: '91%',
      matchVal: 91,
      status: 'Offer Extended',
      isSecondary: true,
    },
  ];

  return (
    <div className="space-y-stack-xl">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-stack-xl">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="text-[11px] font-bold tracking-widest uppercase">AI Intelligence Active</span>
          </div>
          <h2 className="font-display-lg text-display-lg leading-tight text-on-surface">
            Welcome back, <span className="text-primary">Sarah</span>.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Your AI sourcing agents have identified 4 high-potential candidates for the Senior Staff Engineer role since you last logged in.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-primary text-on-primary font-bold rounded-2xl magnetic-button cursor-pointer">
              Review Talent
            </button>
            <button className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface font-bold rounded-2xl transition-all cursor-pointer">
              Daily Briefing
            </button>
          </div>
        </div>

        <div className="w-full md:w-[450px] h-[350px] relative">
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_0_40px_rgba(181,196,255,0.2)]">
            <HolographicOrb />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-stack-xl">
        <div className="glass-pane p-8 flex flex-col gap-4 group hover:bg-white/[0.07] transition-all duration-500">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">work</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Open Positions</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-[40px] text-on-surface">{openPositionsCount}</span>
              <span className="text-primary text-sm font-bold">+2 this week</span>
            </div>
          </div>
        </div>

        <div className="glass-pane p-8 flex flex-col gap-4 group hover:bg-white/[0.07] transition-all duration-500">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">person_search</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Candidates Screened</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-[40px] text-on-surface">{candidatesCount}</span>
              <span className="text-tertiary text-sm font-bold">↑ 12%</span>
            </div>
          </div>
        </div>

        <div className="glass-pane p-8 flex flex-col gap-4 group hover:bg-white/[0.07] transition-all duration-500">
          <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Hiring Success Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-[40px] text-on-surface">{successRateCount}</span>
              <span className="font-display-lg text-[40px]">%</span>
              <span className="text-on-surface-variant text-sm font-mono-technical">Elite Tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Funnel & Table */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hiring Funnel */}
          <div className="glass-pane p-8 overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-md text-headline-md">Hiring Funnel</h3>
              <select className="bg-white/5 border-none text-xs rounded-lg py-1 px-3 text-on-surface-variant focus:ring-1 focus:ring-primary">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="relative h-64 flex items-center justify-around gap-1">
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-full bg-primary/20 h-40 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-x-0 bottom-0 bg-primary/40 h-[90%] transition-all duration-700 group-hover:h-[95%]"></div>
                  <span className="relative font-bold text-xl">1.2k</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Applied</span>
              </div>
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-full bg-primary/20 h-32 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-x-0 bottom-0 bg-primary/50 h-[60%] transition-all duration-700 group-hover:h-[65%]"></div>
                  <span className="relative font-bold text-xl">482</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Screened</span>
              </div>
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-full bg-primary/20 h-24 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-x-0 bottom-0 bg-primary/60 h-[40%] transition-all duration-700 group-hover:h-[45%]"></div>
                  <span className="relative font-bold text-xl">84</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Interviewed</span>
              </div>
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-full bg-primary/20 h-16 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-x-0 bottom-0 bg-primary/80 h-[25%] transition-all duration-700 group-hover:h-[30%]"></div>
                  <span className="relative font-bold text-xl">12</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Hired</span>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="glass-pane p-0 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md">Recent Applications</h3>
              <button className="text-primary text-sm font-bold hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.02] border-b border-white/5">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Candidate</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Role</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">AI Match</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentCandidates.map((candidate, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-white/10">
                            <img className="w-full h-full object-cover" alt={candidate.name} src={candidate.avatar} />
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{candidate.name}</p>
                            <p className="text-xs text-on-surface-variant">{candidate.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-mono-technical">{candidate.role}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${candidate.isTertiary ? 'text-tertiary' : 'text-primary'}`}>
                            {candidate.match}
                          </span>
                          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${candidate.isTertiary ? 'bg-tertiary' : 'bg-primary'}`} 
                              style={{ width: `${candidate.matchVal}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                          candidate.isTertiary 
                            ? 'bg-tertiary/10 text-tertiary' 
                            : candidate.isSecondary 
                              ? 'bg-secondary/10 text-secondary' 
                              : 'bg-primary/10 text-primary'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: AI Assistant & Alerts */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Assistant Panel */}
          <div className="ai-glow-border p-8 min-h-[400px] flex flex-col shadow-[0_0_30px_rgba(181,196,255,0.1)]">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="font-headline-md text-headline-md">AI Insights</h3>
            </div>
            
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
              {messages.length === 0 ? (
                <>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden group">
                    <div className="scan-line absolute inset-x-0 h-1 z-0 pointer-events-none"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">Hiring Alert</p>
                      <span className="text-[10px] text-on-surface-variant">2m ago</span>
                    </div>
                    <p className="text-sm text-on-surface leading-relaxed relative z-10">
                      High market demand for <b>Machine Learning Engineers</b>. Recommend adjusting offer ceiling for current candidates.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                    <p className="text-xs font-bold text-tertiary uppercase tracking-widest">Pending Interviews</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">14:30 - Jordan S.</p>
                            <p className="text-[10px] text-on-surface-variant">Technical Round</p>
                          </div>
                        </div>
                        <button className="text-primary material-symbols-outlined cursor-pointer">arrow_forward</button>
                      </div>
                      <div className="flex items-center justify-between opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">16:00 - Alex R.</p>
                            <p className="text-[10px] text-on-surface-variant">Portfolio Review</p>
                          </div>
                        </div>
                        <button className="text-primary material-symbols-outlined cursor-pointer">arrow_forward</button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-2xl border border-white/5 space-y-1 relative overflow-hidden group ${
                      msg.sender === 'ai' ? 'bg-primary/5 border-primary/20' : 'bg-white/5'
                    }`}
                  >
                    {msg.sender === 'ai' && <div className="scan-line absolute inset-x-0 h-1 z-0 pointer-events-none"></div>}
                    <div className="flex justify-between items-start relative z-10">
                      <p className={`text-xs font-bold uppercase tracking-widest ${
                        msg.sender === 'ai' ? 'text-primary' : 'text-tertiary'
                      }`}>
                        {msg.sender === 'ai' ? 'AI Assistant' : 'You'}
                      </p>
                    </div>
                    <p className="text-sm text-on-surface leading-relaxed relative z-10 whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))
              )}

              {isAIResponding && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-1 animate-pulse">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">AI Assistant</p>
                  <p className="text-sm text-on-surface-variant">Thinking...</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSendAI} className="mt-8 pt-6 border-t border-white/10">
              <div className="relative">
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface" 
                  placeholder="Ask AI Assistant..." 
                  type="text"
                  value={askAI}
                  onChange={(e) => setAskAI(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </form>
          </div>

          {/* Market Context Card */}
          <div className="glass-pane p-8 relative overflow-hidden h-48 group flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">Global Market Heatmap</h4>
              <p className="text-xs text-on-surface-variant">AI sourcing is currently targeting talent in London &amp; Berlin clusters.</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer self-start">
              View Heatmap
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Dashboard;
