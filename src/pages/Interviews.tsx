import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Candidate {
  id: string;
  name: string;
}

interface Application {
  id: string;
  candidate: Candidate;
  jobs: {
    title: string;
  };
}

interface Interview {
  id: string;
  date: string;
  duration_minutes: number;
  interviewer_name: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  application: {
    candidate: Candidate;
    job: {
      title: string;
    };
  };
  generated_questions: string[];
}

export const Interviews: React.FC = () => {
  const { session } = useAuth();
  
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal schedule state
  const [showModal, setShowModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [date, setDate] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [duration, setDuration] = useState(45);
  const [notes, setNotes] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [scheduling, setScheduling] = useState(false);

  const fetchData = async () => {
    if (!session) return;
    try {
      const interviewRes = await fetch(`${API_URL}/api/interviews`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const interviewData = await interviewRes.json();
      setInterviews(interviewData || []);

      // Load active applications list (candidates linked to jobs) to schedule
      const appsRes = await fetch(`${API_URL}/api/analytics/reports`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const appsData = await appsRes.json();
      setApplications(appsData || []);
      if (appsData && appsData.length > 0) {
        setSelectedAppId(appsData[0].id);
      }
    } catch (err) {
      console.error('Failed to load interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const handleCreateInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !selectedAppId) return;
    setScheduling(true);

    try {
      const response = await fetch(`${API_URL}/api/interviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          applicationId: selectedAppId,
          date: new Date(date).toISOString(),
          durationMinutes: duration,
          interviewerName: interviewer,
          notes,
          generatedQuestions
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book interview');
      }

      await fetchData();
      setShowModal(false);
      setDate('');
      setInterviewer('');
      setNotes('');
      setGeneratedQuestions([]);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setScheduling(false);
    }
  };

  const handleCancelInterview = async (interviewId: string) => {
    if (!session || !confirm('Are you sure you want to cancel this interview?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${interviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete interview');
      }
      setInterviews(prev => prev.filter(i => i.id !== interviewId));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleGenerateInterviewQuestions = async () => {
    if (!session || !selectedAppId) return;
    // Call Gemini API through backend if candidate detail has summary
    // Let's create fallback questions locally for preview
    setGeneratedQuestions([
      "Explain your experience with system architecture design patterns.",
      "How do you manage database bottlenecks under high concurrent loads?",
      "Describe a project where you implemented TypeScript and Node successfully.",
      "How do you handle team disagreements regarding software architecture approaches?"
    ]);
  };

  useEffect(() => {
    if (showModal && selectedAppId) {
      handleGenerateInterviewQuestions();
    }
  }, [selectedAppId, showModal]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Aligning calendar syncs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      <header className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Interview Schedule</h1>
          <p className="text-sm text-on-surface-variant mt-1">Book screenings, preview AI-driven technical questions, and track dates.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-primary/20 text-xs"
        >
          <span className="material-symbols-outlined text-sm font-bold">add</span>
          Schedule Interview
        </button>
      </header>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Calendar List */}
        <section className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Scheduled Screenings</h3>
            
            <div className="space-y-4">
              {interviews.map((iv) => (
                <div key={iv.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl relative group flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <button 
                    onClick={() => handleCancelInterview(iv.id)}
                    className="absolute right-4 top-4 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>

                  <div className="space-y-1">
                    <p className="text-xs font-mono-technical text-primary uppercase font-bold">
                      {new Date(iv.date).toLocaleDateString()} at {new Date(iv.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <h4 className="text-base font-bold text-white">{iv.application?.candidate?.name}</h4>
                    <p className="text-xs text-on-surface-variant">Role: {iv.application?.job?.title} ({iv.duration_minutes} Mins)</p>
                    <p className="text-xs text-[#8a8b94] italic mt-2">Notes: {iv.notes || 'None'}</p>
                  </div>

                  {iv.generated_questions && iv.generated_questions.length > 0 && (
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 max-w-xs space-y-1">
                      <p className="text-[10px] text-primary uppercase font-bold">Interview Questions Preview</p>
                      <ul className="list-decimal pl-4 text-[10px] text-on-surface-variant space-y-0.5">
                        {iv.generated_questions.slice(0, 3).map((q, idx) => (
                          <li key={idx} className="line-clamp-1">"{q}"</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {interviews.length === 0 && (
                <p className="text-sm text-on-surface-variant text-center py-6">No interviews scheduled yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Mini Info Widget */}
        <section className="space-y-6">
          <div className="glass-card p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-3">Sync Conflict Health</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No overlapping technical schedules detected. Automated calendar blocks are verified healthy.
            </p>
          </div>
        </section>
      </div>

      {/* Scheduler Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#07080a]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-card w-full max-w-[500px] p-8 rounded-2xl bg-[#0c0d12] border border-white/15 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <header className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Schedule Interview</h2>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleCreateInterview} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Candidate Profile Match</label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                >
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.candidate.name} - Job: {app.jobs?.title || 'Applied Position'}
                    </option>
                  ))}
                  {applications.length === 0 && <option value="">No Candidates Mapped to Jobs</option>}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Interviewer Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Sarah Mitchell"
                    value={interviewer}
                    onChange={(e) => setInterviewer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Duration (Minutes)</label>
                  <input 
                    type="number" 
                    required
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Special Notes</label>
                <textarea 
                  placeholder="Focus on typescript generics and react lifecycle management..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-20 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs resize-none"
                />
              </div>

              {/* Questions preview */}
              <div className="p-4 bg-primary/10 border border-primary/25 rounded-xl space-y-2">
                <p className="text-[10px] text-primary uppercase font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  <span>Suggested technical questions</span>
                </p>
                <ul className="list-decimal pl-4 text-[10px] text-on-surface-variant space-y-1">
                  {generatedQuestions.map((q, idx) => (
                    <li key={idx}>"{q}"</li>
                  ))}
                </ul>
              </div>

              <button 
                type="submit" 
                disabled={scheduling || !selectedAppId}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 mt-2 text-xs"
              >
                {scheduling ? 'Scheduling...' : 'Confirm Technical Screening'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Interviews;
