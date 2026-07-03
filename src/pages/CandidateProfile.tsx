import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ScoreResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skill_gap: string[];
}

interface Application {
  id: string;
  status: string;
  match_score: number;
  jobs: {
    id: string;
    title: string;
    department: string;
  };
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience_years: number;
  education: string;
  summary: string;
  resume_url: string;
  resume_scores?: ScoreResult[];
  applications?: Application[];
}

export const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useAuth();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active scoring selections
  const [activeScore, setActiveScore] = useState<ScoreResult | null>(null);
  const [activeApp, setActiveApp] = useState<Application | null>(null);

  // Booking states
  const [showScheduler, setShowScheduler] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [notes, setNotes] = useState('');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!session) return;
      try {
        const response = await fetch(`http://localhost:5000/api/candidates/${id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to retrieve candidate profile');
        }

        const data = await response.json();
        setCandidate(data);

        // Auto select first application evaluation details
        if (data.resume_scores && data.resume_scores.length > 0) {
          setActiveScore(data.resume_scores[0]);
        }
        if (data.applications && data.applications.length > 0) {
          setActiveApp(data.applications[0]);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [id, session]);

  const handleBookInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !activeApp) return;

    setBooking(true);
    try {
      const response = await fetch(`${API_URL}/api/interviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          applicationId: activeApp.id,
          date: new Date(interviewDate).toISOString(),
          interviewerName: interviewer,
          notes,
          generatedQuestions: activeScore?.weaknesses ? activeScore.weaknesses : []
        })
      });

      if (!response.ok) {
        throw new Error('Failed to schedule interview');
      }

      alert('Interview successfully scheduled!');
      setShowScheduler(false);
      setInterviewDate('');
      setInterviewer('');
      setNotes('');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Loading Candidate File...</p>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="glass-card p-8 rounded-2xl border border-red-500/20 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-red-400 text-5xl mb-4">error</span>
        <h3 className="text-lg font-bold text-white mb-2">Error Loading Profile</h3>
        <p className="text-sm text-red-400 mb-6">{error || 'Candidate not found.'}</p>
        <button onClick={() => navigate('/pipeline')} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
          Back to Pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <button onClick={() => navigate('/pipeline')} className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-white transition-colors mb-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Pipeline Overview</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white">{candidate.name}</h1>
          <p className="text-sm text-on-surface-variant mt-1">{candidate.email} • {candidate.phone || 'No phone number'}</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setShowScheduler(true)} 
            disabled={!activeApp}
            className="px-5 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span>Schedule Interview</span>
          </button>
        </div>
      </header>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Column: General Info */}
        <section className="space-y-6">
          <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
            <div>
              <h3 className="text-xs uppercase font-mono-technical tracking-widest text-primary font-bold mb-3">Executive Summary</h3>
              <p className="text-sm text-[#8a8b94] leading-relaxed">{candidate.summary || 'No summary extracted.'}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase font-mono-technical tracking-widest text-primary font-bold mb-3">Key Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills && candidate.skills.length > 0 ? (
                  candidate.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-on-surface-variant">No skills listed.</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-xs text-on-surface-variant font-semibold">Experience Years</p>
                <p className="text-lg font-bold text-white mt-1">{candidate.experience_years} years</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold">Education</p>
                <p className="text-sm font-bold text-white mt-1 line-clamp-2">{candidate.education || 'Self-taught / Other'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right 2 Columns: Match Report & Evaluations */}
        <section className="lg:col-span-2 space-y-6">
          {activeApp && activeScore ? (
            <div className="glass-card p-8 rounded-2xl bg-white/5 border border-white/10 space-y-8">
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Role Match Analysis</h2>
                  <p className="text-sm text-on-surface-variant">Assessing alignment for role: <strong>{activeApp.jobs.title}</strong></p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono-technical tracking-widest text-on-surface-variant uppercase">Gemini Grade</span>
                    <p className="text-3xl font-extrabold text-primary">{activeScore.score}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-mono-technical tracking-widest text-green-400 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Strengths</span>
                  </h3>
                  <ul className="space-y-2">
                    {activeScore.strengths.map((str, idx) => (
                      <li key={idx} className="text-sm text-[#8a8b94] flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-mono-technical tracking-widest text-red-400 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    <span>Concerns / Gaps</span>
                  </h3>
                  <ul className="space-y-2">
                    {activeScore.weaknesses.map((weak, idx) => (
                      <li key={idx} className="text-sm text-[#8a8b94] flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Skills Gap */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <h3 className="text-xs uppercase font-mono-technical tracking-widest text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">gpp_maybe</span>
                  <span>Missing Skill Gap</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeScore.skill_gap && activeScore.skill_gap.length > 0 ? (
                    activeScore.skill_gap.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs font-semibold">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-green-400 flex items-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      All role requirement skills met!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl bg-white/5 border border-white/10 text-center py-12 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-4xl mb-2">find_in_page</span>
              <p>No job application matching report generated. Select an active pipeline match in the dashboard to review analysis.</p>
            </div>
          )}
        </section>
      </div>

      {/* Booking Scheduler Modal Overlay */}
      {showScheduler && activeApp && (
        <div className="fixed inset-0 bg-[#07080a]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-card w-full max-w-[480px] p-8 rounded-2xl bg-[#0c0d12] border border-white/15 shadow-2xl relative">
            <header className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Schedule Interview</h2>
              <button onClick={() => setShowScheduler(false)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleBookInterview} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Interview Date & Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Interviewer Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Sarah Mitchell"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Notes / Instructions</label>
                <textarea 
                  placeholder="Technical screening focused on TypeScript and system architecture..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={booking}
                className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 disabled:scale-100 mt-2 text-sm"
              >
                {booking ? 'Scheduling...' : 'Book Interview'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CandidateProfile;
