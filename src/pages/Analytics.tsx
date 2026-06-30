import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

export const Analytics: React.FC = () => {
  const openJobs = useCountUp(142);
  const applications = useCountUp(2841);
  const interviews = useCountUp(428);
  const offers = useCountUp(86);
  const hires = useCountUp(62);

  const trendData = [
    { month: 'JAN', height: '40%', val: '428 Apps' },
    { month: 'FEB', height: '55%', val: '584 Apps' },
    { month: 'MAR', height: '75%', val: '722 Apps' },
    { month: 'APR', height: '90%', val: '842 Apps', active: true },
    { month: 'MAY', height: '65%', val: '612 Apps' },
    { month: 'JUN', height: '80%', val: '792 Apps' },
  ];

  return (
    <div className="space-y-8">
      {/* Title & Filter bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Analytics</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Real-time performance and sourcing efficiency metrics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass-pane px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors text-sm">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span className="font-medium text-on-surface">Last 30 Days</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
          <div className="glass-pane px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors text-sm">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            <span className="font-medium text-on-surface">All Departments</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
          <button className="bg-surface-container-high px-4 py-2 rounded-xl border border-white/10 hover:border-primary/30 transition-all flex items-center gap-2 group cursor-pointer text-sm font-semibold">
            <span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">download</span>
            <span className="text-on-surface">Export Report</span>
          </button>
        </div>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Open Jobs */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-surface-variant font-label-caps text-xs">Open Jobs</span>
            <span className="material-symbols-outlined text-primary/50">work_outline</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-on-surface">{openJobs}</span>
            <span className="text-primary text-xs font-medium pb-1.5 flex items-center gap-0.5">
              +12% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4 h-8 w-full opacity-40">
            <div className="flex items-end gap-1 h-full">
              <div className="bg-primary w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-primary w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-primary w-full h-2/3 rounded-t-sm"></div>
              <div className="bg-primary w-full h-full rounded-t-sm"></div>
              <div className="bg-primary w-full h-4/5 rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-surface-variant font-label-caps text-xs">Applications</span>
            <span className="material-symbols-outlined text-primary/50">description</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-on-surface">
              {applications.toLocaleString()}
            </span>
            <span className="text-primary text-xs font-medium pb-1.5 flex items-center gap-0.5">
              +24% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4 h-8 w-full opacity-40">
            <div className="flex items-end gap-1 h-full">
              <div className="bg-primary w-full h-1/3 rounded-t-sm"></div>
              <div className="bg-primary w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-primary w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-primary w-full h-2/3 rounded-t-sm"></div>
              <div className="bg-primary w-full h-full rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* Interviews */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-surface-variant font-label-caps text-xs">Interviews</span>
            <span className="material-symbols-outlined text-primary/50">forum</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-on-surface">{interviews}</span>
            <span className="text-error text-xs font-medium pb-1.5 flex items-center gap-0.5">
              -2% <span className="material-symbols-outlined text-xs">trending_down</span>
            </span>
          </div>
          <div className="mt-4 h-8 w-full opacity-40">
            <div className="flex items-end gap-1 h-full">
              <div className="bg-primary w-full h-4/5 rounded-t-sm"></div>
              <div className="bg-primary w-full h-2/3 rounded-t-sm"></div>
              <div className="bg-primary w-full h-full rounded-t-sm"></div>
              <div className="bg-primary w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-primary w-full h-1/3 rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-surface-variant font-label-caps text-xs">Offers</span>
            <span className="material-symbols-outlined text-primary/50">assignment_turned_in</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-on-surface">{offers}</span>
            <span className="text-primary text-xs font-medium pb-1.5 flex items-center gap-0.5">
              +5% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4 h-8 w-full opacity-40">
            <div className="flex items-end gap-1 h-full">
              <div className="bg-primary w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-primary w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-primary w-full h-full rounded-t-sm"></div>
              <div className="bg-primary w-full h-4/5 rounded-t-sm"></div>
              <div className="bg-primary w-full h-2/3 rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* Hires */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-surface-variant font-label-caps text-xs">Hires</span>
            <span className="material-symbols-outlined text-primary/50">person_add</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-on-surface">{hires}</span>
            <span className="text-primary text-xs font-medium pb-1.5 flex items-center gap-0.5">
              +18% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4 h-8 w-full opacity-40">
            <div className="flex items-end gap-1 h-full">
              <div className="bg-primary w-full h-1/4 rounded-t-sm"></div>
              <div className="bg-primary w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-primary w-full h-2/3 rounded-t-sm"></div>
              <div className="bg-primary w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-primary w-full h-full rounded-t-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Funnel & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Hiring Funnel */}
        <div className="lg:col-span-5 glass-card p-8 rounded-3xl relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-xl text-on-surface">Hiring Funnel</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          
          <div className="space-y-4 relative">
            <div className="flex flex-col gap-2">
              <div className="w-full h-12 bg-primary/20 border border-primary/30 rounded-lg flex items-center px-4 justify-between group cursor-help hover:bg-primary/30 transition-colors text-on-surface">
                <span className="text-[10px] font-bold font-mono-technical tracking-wider">SOURCED</span>
                <span className="text-lg font-bold">12,400</span>
              </div>
              <div className="w-[85%] h-12 bg-primary/30 border border-primary/40 rounded-lg flex items-center px-4 justify-between group cursor-help hover:bg-primary/40 transition-colors text-on-surface">
                <span className="text-[10px] font-bold font-mono-technical tracking-wider">SCREENED</span>
                <span className="text-lg font-bold">2,841</span>
              </div>
              <div className="w-[70%] h-12 bg-primary/40 border border-primary/50 rounded-lg flex items-center px-4 justify-between group cursor-help hover:bg-primary/50 transition-colors text-on-surface">
                <span className="text-[10px] font-bold font-mono-technical tracking-wider">INTERVIEWED</span>
                <span className="text-lg font-bold">428</span>
              </div>
              <div className="w-[55%] h-12 bg-primary/50 border border-primary/60 rounded-lg flex items-center px-4 justify-between group cursor-help hover:bg-primary/60 transition-colors text-on-surface">
                <span className="text-[10px] font-bold font-mono-technical tracking-wider">OFFERED</span>
                <span className="text-lg font-bold">86</span>
              </div>
              <div className="w-[40%] h-12 bg-primary/70 border border-primary/80 rounded-lg flex items-center px-4 justify-between group cursor-help hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20 text-on-primary">
                <span className="text-[10px] font-bold font-mono-technical tracking-wider">HIRED</span>
                <span className="text-lg font-bold">62</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Overall Conversion</p>
              <p className="text-2xl font-bold text-primary">0.5%</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Time to Fill (Avg)</p>
              <p className="text-2xl font-bold text-on-surface">24 Days</p>
            </div>
          </div>
        </div>

        {/* Hiring Trends */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-xl text-on-surface">Hiring Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs text-on-surface-variant">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-xs text-on-surface-variant">Hires</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 relative flex items-end justify-between px-4 pb-6 group">
            {/* Vertical Scanning Line Simulation */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
            
            {/* Simplified Bars for Trend Visualization */}
            <div className="flex items-end gap-6 w-full h-full border-b border-white/10 z-0">
              {trendData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1 h-full relative">
                  {/* Tooltip Highlight */}
                  <div className="absolute -top-12 bg-surface-container-high border border-white/20 p-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-on-surface z-20">
                    {data.val}
                  </div>
                  <div 
                    className={`w-full rounded-t transition-all ${
                      data.active 
                        ? 'bg-primary shadow-[0_0_15px_rgba(181,196,255,0.4)] h-[90%]' 
                        : 'bg-primary/20 hover:bg-primary/40'
                    }`}
                    style={{ height: data.active ? undefined : data.height }}
                  ></div>
                  <span className="text-[10px] text-on-surface-variant font-mono-technical mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* AI Insights Card (Full Width) */}
      <div className="glass-card p-8 rounded-3xl relative border border-primary/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]"></div>
        <div className="relative flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <div className="flex-1">
            <h3 className="font-headline-md text-xl mb-4 flex items-center gap-3 text-on-surface font-bold">
              AI Recruiting Insights
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full uppercase tracking-widest font-bold border border-primary/20">Predictive</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <p className="text-on-surface-variant text-xs mb-1 font-label-caps tracking-wider font-semibold">Projected Time to Hire</p>
                <div className="flex items-end gap-2 text-on-surface">
                  <span className="text-2xl font-bold">18.5 Days</span>
                  <span className="text-emerald-400 text-xs font-semibold pb-1 flex items-center">-4.2 Days</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2">Due to enhanced auto-screening efficiency.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <p className="text-on-surface-variant text-xs mb-1 font-label-caps tracking-wider font-semibold">Candidate Quality Score</p>
                <div className="flex items-end gap-2 text-on-surface">
                  <span className="text-2xl font-bold">8.4 / 10</span>
                  <span className="text-emerald-400 text-xs font-semibold pb-1 flex items-center">+12%</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2">Sourced candidates exhibit stronger tech match.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <p className="text-on-surface-variant text-xs mb-1 font-label-caps tracking-wider font-semibold">Sourcing Satiation Velocity</p>
                <div className="flex items-end gap-2 text-on-surface">
                  <span className="text-2xl font-bold">2.4x Speed</span>
                  <span className="text-emerald-400 text-xs font-semibold pb-1 flex items-center">Optimal</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2">Matching pipeline saturation is reached within 72 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
