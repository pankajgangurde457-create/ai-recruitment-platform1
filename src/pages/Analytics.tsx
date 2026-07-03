import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface StatsOverview {
  activeJobs: number;
  totalCandidates: number;
  pendingInterviews: number;
  avgMatchScore: number;
}

interface Trend {
  month: string;
  count: number;
}

export const Analytics: React.FC = () => {
  const { session } = useAuth();
  
  const [stats, setStats] = useState<StatsOverview>({
    activeJobs: 0,
    totalCandidates: 0,
    pendingInterviews: 0,
    avgMatchScore: 0
  });

  const [trends, setTrends] = useState<Trend[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session) return;
      try {
        const response = await fetch('http://localhost:5000/api/analytics/overview', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setStats(data.summary);
        setTrends(data.trends || []);
        setStatusDistribution(data.statusDistribution || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [session]);

  const handleExportReport = () => {
    alert('Exporting detailed recruitment CSV audit report...');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Aggregating Platform metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      {/* Title & Filter bar */}
      <header className="flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Sourcing Analytics</h1>
          <p className="text-sm text-on-surface-variant mt-1">Real-time performance metrics and pipeline conversion velocities.</p>
        </div>
        <button 
          onClick={handleExportReport}
          className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          <span>Export Audit Trail</span>
        </button>
      </header>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Open Jobs */}
        <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-on-surface-variant text-xs uppercase font-mono-technical font-bold">Active Jobs</span>
            <span className="material-symbols-outlined text-primary text-sm">work_outline</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.activeJobs}</p>
          <p className="text-[10px] text-on-surface-variant mt-1.5">Positions actively receiving matches</p>
        </div>

        {/* Total Sourced Candidates */}
        <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-on-surface-variant text-xs uppercase font-mono-technical font-bold">Total Sourced</span>
            <span className="material-symbols-outlined text-primary text-sm">group</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.totalCandidates}</p>
          <p className="text-[10px] text-on-surface-variant mt-1.5">Candidates parsed and evaluated</p>
        </div>

        {/* Screenings Scheduled */}
        <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-on-surface-variant text-xs uppercase font-mono-technical font-bold">Scheduled Interviews</span>
            <span className="material-symbols-outlined text-primary text-sm">forum</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.pendingInterviews}</p>
          <p className="text-[10px] text-on-surface-variant mt-1.5">Scheduled calendar screens</p>
        </div>

        {/* Avg Match score */}
        <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-on-surface-variant text-xs uppercase font-mono-technical font-bold">Avg Compatability</span>
            <span className="material-symbols-outlined text-primary text-sm">analytics</span>
          </div>
          <p className="text-3xl font-extrabold text-primary">{stats.avgMatchScore}%</p>
          <p className="text-[10px] text-on-surface-variant mt-1.5">Sourcing match threshold average</p>
        </div>
      </div>

      {/* Funnel & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Funnel */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white">Pipeline Conversions</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface-variant">APPLIED</span>
              <span className="font-bold text-white">{statusDistribution['applied'] || 0}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface-variant">SCREENED</span>
              <span className="font-bold text-white">{statusDistribution['screening'] || 0}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface-variant">INTERVIEWED</span>
              <span className="font-bold text-white">{statusDistribution['interview'] || 0}</span>
            </div>
            <div className="p-3 bg-[#11131a] border border-primary/20 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-primary">OFFERED / HIRED</span>
              <span className="font-bold text-primary">
                {(statusDistribution['offer'] || 0) + (statusDistribution['hired'] || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Trends */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white">Sourcing Trends</h3>
          
          <div className="h-48 flex items-end justify-between px-2 border-b border-white/10 pb-4">
            {trends.map((t, idx) => {
              const maxVal = Math.max(...trends.map(tr => tr.count), 1);
              const percentage = Math.round((t.count / maxVal) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-2 flex-grow h-full justify-end group relative">
                  <div className="absolute -top-8 bg-[#0c0d12] border border-white/10 text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.count} Candidate(s)
                  </div>
                  <div 
                    className="w-8 bg-primary/20 hover:bg-primary/50 transition-colors rounded-t-sm"
                    style={{ height: `${percentage}%` }}
                  ></div>
                  <span className="text-[10px] font-mono-technical text-on-surface-variant">{t.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
