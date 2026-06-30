import React from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { HolographicOrb } from '../components/HolographicOrb';

export const ExecutiveDashboard: React.FC = () => {
  const openPositions = useCountUp(12);
  const candidatesScreened = useCountUp(482);
  const successRate = useCountUp(94);

  const recentApplications = [
    {
      name: 'Alex Rivera',
      location: 'San Francisco, CA',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiYKPlnLtPGJBRZN2VLVE_3KrIgZS1idu6-6PtewuiEvAP-hGt1MUjQnB__tXEZFa0yIZDtb5NxGfOxFXzvI-j-h3pQh8mfLagDcpjZPoW8zuIDJu-Ljp2Ma31Wf_rZDvO9REswAg80mSzEoTILdS4JCBM1-89PuouGZ_ISq4Q8U75dYEVbiyn_EYxq_Q1_go3kv0nYd4gXUmzNL13db1EfbPctQoCLdFYL04-YnKUcYHOEPPyAmv5VJOzlBDqb94f1bGhsum2rqNF',
      role: 'Senior Product Designer',
      match: 98,
      status: 'Interviewing',
      statusClass: 'bg-primary/10 text-primary border border-primary/20',
    },
    {
      name: 'Jordan Smith',
      location: 'London, UK',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh10qaC9tFBI2bpgfymSQb9SpNp2fdh8B3gyTsaV-K4y8ruh9CURpsdJDbCS0PafiZXUFttAmAUmI4Z9Kxyo8BOqIGVYy1FpfASEaZzV-1kxWRu53JHaWAFUrHNSKNvBp0wo1xgJwJPofPrylVFd3FNPN9kLd8snGXObcJGHDKWcwZEvqGW_TL4ermLugajsS5wMO5Rte6exjlkLv8wCqu60vrF5fkfZEdUXcBEPPiyMVNceXE6MwH9FSfwlDpLYjZGblmxw94YvXf',
      role: 'Lead Frontend Engineer',
      match: 92,
      status: 'Screening',
      statusClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    },
    {
      name: 'Chen Wei',
      location: 'Singapore',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMxuV4ax_VMW7rkDZKB7_w8F91nSNLcNJ3c9JKo8HgUe_BdtWu4JFSrDhUBGIDu0fBUuHRMY-Um46mhE-cgxg0gaODSbPzymCHvBE1AtoD7u_a8lzNUdaNEJODYBxakT2EYJvmA-Fnr8iQo1WkBoxQ9LyvrTtbRjN837sLDF05Som8goKgBS-s0g17jgK_Um99U5JwVSV0_xcRTCjS06DDRag2HdfWKTvJlkuY8AY8FmMk6jT5ptlHrQ6eEemkJWGTLdRVkYiO8Koi',
      role: 'Full Stack Developer',
      match: 87,
      status: 'Applied',
      statusClass: 'bg-surface-variant text-on-surface-variant border border-white/10',
    },
  ];

  return (
    <div className="space-y-stack-xl">
      {/* Welcome Header */}
      <div className="mb-stack-xl flex justify-between items-end">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Welcome back, Alex</h2>
          <p className="text-on-surface-variant mt-2 font-body-base">Your AI agents have screened 14 new candidates since your last visit.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono-technical">AI Engine Active</span>
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-xl">
        <div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary text-3xl">work_outline</span>
            <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+2 this week</span>
          </div>
          <div className="mt-8">
            <h4 className="text-on-surface-variant text-sm font-label-caps tracking-widest">OPEN POSITIONS</h4>
            <p className="text-4xl font-bold mt-1 text-on-surface">{openPositions}</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-tertiary text-3xl">person_search</span>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Processing...</span>
          </div>
          <div className="mt-8">
            <h4 className="text-on-surface-variant text-sm font-label-caps tracking-widest">CANDIDATES SCREENED</h4>
            <p className="text-4xl font-bold mt-1 text-on-surface">{candidatesScreened}</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
            <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">Top 5% Industry</span>
          </div>
          <div className="mt-8">
            <h4 className="text-on-surface-variant text-sm font-label-caps tracking-widest">HIRING SUCCESS RATE</h4>
            <p className="text-4xl font-bold mt-1 text-on-surface">{successRate}%</p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Funnel & Table */}
        <div className="lg:col-span-8 space-y-gutter">
          
          {/* Interactive Funnel Chart */}
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-md text-headline-md text-on-surface">Hiring Funnel</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">Last 30 Days</button>
                <button className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_horiz</button>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 h-64 px-4">
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-primary/20 rounded-t-xl funnel-bar relative group cursor-pointer" style={{ height: '100%' }}>
                  <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-40 transition-opacity rounded-t-xl"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">1,240</div>
                </div>
                <span className="text-xs font-mono-technical text-on-surface-variant">Applied</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-primary/40 rounded-t-xl funnel-bar relative group cursor-pointer" style={{ height: '60%' }}>
                  <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-40 transition-opacity rounded-t-xl"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">744</div>
                </div>
                <span className="text-xs font-mono-technical text-on-surface-variant">Screened</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-primary/60 rounded-t-xl funnel-bar relative group cursor-pointer" style={{ height: '35%' }}>
                  <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-40 transition-opacity rounded-t-xl"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">434</div>
                </div>
                <span className="text-xs font-mono-technical text-on-surface-variant">Interviewed</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-primary rounded-t-xl funnel-bar relative group cursor-pointer" style={{ height: '15%' }}>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-40 transition-opacity rounded-t-xl"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-2 py-1 rounded text-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">186</div>
                </div>
                <span className="text-xs font-mono-technical text-on-surface-variant">Hired</span>
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="glass-card overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">Recent Applications</h3>
              <button className="text-primary text-sm font-semibold hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-on-surface-variant text-xs font-label-caps uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Candidate</th>
                    <th className="px-8 py-4">Role</th>
                    <th className="px-8 py-4">AI Match</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentApplications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container border border-white/10 overflow-hidden">
                            <img className="w-full h-full object-cover" alt={app.name} src={app.avatar} />
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{app.name}</p>
                            <p className="text-xs text-on-surface-variant">{app.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">{app.role}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${app.match}%` }}></div>
                          </div>
                          <span className="text-xs font-mono-technical text-emerald-400">{app.match}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.statusClass}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">chevron_right</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Sidebar: AI Insights & Details */}
        <div className="lg:col-span-4 space-y-gutter">
          {/* AI Insights Panel */}
          <div className="glass-card ai-border-animate p-8 overflow-hidden relative">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-tertiary">psychology</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">AI Insights</h3>
                </div>
                
                {/* Embedded Three.js Orb Canvas */}
                <div className="w-full h-48 flex items-center justify-center relative mb-8 overflow-hidden rounded-2xl bg-black/40">
                  <div className="absolute inset-0 z-0 opacity-80 scale-75">
                    <HolographicOrb />
                  </div>
                  <div className="relative z-10 text-center pointer-events-none">
                    <p className="text-xs font-mono-technical uppercase tracking-widest text-primary-fixed mb-2">Analyzing Marketplace</p>
                    <p className="text-lg font-bold text-white">Trend Detected</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 border-l-4 border-tertiary p-4 rounded-r-xl">
                    <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-1">Market Insight</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Sourcing vectors show high availability of Senior Designers in <b>London</b>. Recommend starting a sourcing run.
                    </p>
                  </div>
                  <div className="bg-white/5 border-l-4 border-primary p-4 rounded-r-xl">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Candidate Matching</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      AI agents detected a <b>98% match</b> for the Staff Product Designer role. Auto-scheduling request sent.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface font-semibold rounded-xl transition-all cursor-pointer text-sm">
                Open Sourcing Agent Config
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExecutiveDashboard;
