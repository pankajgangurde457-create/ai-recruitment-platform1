import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
}

interface Application {
  id: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  match_score: number;
  candidate: Candidate;
  job: {
    id: string;
    title: string;
    department: string;
  };
}

export const TalentPipeline: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPipeline = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${API_URL}/api/analytics/reports`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve applications pipeline');
      }
      const data = await response.json();
      setApplications(data || []);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline();
  }, [session]);

  const handleUpdateStatus = async (appId: string, newStatus: Application['status']) => {
    if (!session) return;
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/applications/${appId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update stage status');
      }

      // Update state local
      setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    } catch (err: any) {
      alert(`Error updating stage: ${err.message}`);
    }
  };

  // Split applications by status lanes
  const laneKeys: Application['status'][] = ['applied', 'screening', 'interview', 'offer', 'hired'];
  const lanes = laneKeys.reduce((acc, key) => {
    acc[key] = applications.filter(app => app.status === key);
    return acc;
  }, {} as Record<Application['status'], Application[]>);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Retrieving Recruiter Pipeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Talent Pipeline</h1>
        <p className="text-sm text-on-surface-variant mt-1">Track active candidates across hiring stages. Manage match reports and screenings.</p>
      </header>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 overflow-x-auto pb-4">
        
        {laneKeys.map((laneName) => {
          const laneApps = lanes[laneName] || [];
          return (
            <div key={laneName} className="flex flex-col min-w-[240px] bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
              <header className="flex justify-between items-center px-1">
                <span className="text-xs uppercase font-mono-technical font-bold text-white tracking-wider">{laneName}</span>
                <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">
                  {laneApps.length}
                </span>
              </header>

              <div className="flex-1 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {laneApps.map((app) => (
                  <div key={app.id} className="glass-card p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all space-y-3 relative group">
                    <div>
                      <h4 className="font-bold text-white text-sm leading-snug">{app.candidate?.name}</h4>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{app.job?.title}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono-technical text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                        {app.match_score}% Score
                      </span>

                      {/* Advance Stage buttons */}
                      <div className="flex gap-1">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value as any)}
                          className="bg-[#0c0d12] border border-white/10 text-[9px] rounded px-1.5 py-0.5 text-white focus:outline-none"
                        >
                          {laneKeys.map(k => (
                            <option key={k} value={k}>{k.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/candidate/${app.candidate?.id}`)}
                      className="w-full text-center py-1.5 bg-white/5 hover:bg-primary hover:text-on-primary rounded text-[10px] font-bold transition-all cursor-pointer mt-1"
                    >
                      View Dossier
                    </button>
                  </div>
                ))}

                {laneApps.length === 0 && (
                  <p className="text-center text-xs text-on-surface-variant py-8 italic">Lane is empty</p>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
export default TalentPipeline;
