import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  experience_level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  skills_required: string[];
  salary_range?: string;
  status: 'active' | 'closed' | 'draft';
  created_at: string;
}

export const JobBoard: React.FC = () => {
  const { session } = useAuth();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<Job['type']>('Full-time');
  const [expLevel, setExpLevel] = useState<Job['experience_level']>('Mid');
  const [salaryRange, setSalaryRange] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState<Job['status']>('active');
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve jobs');
      }
      const data = await response.json();
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setSubmitting(true);

    try {
      const parsedSkills = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          title,
          description,
          department,
          location,
          type,
          experience_level: expLevel,
          skills_required: parsedSkills,
          salary_range: salaryRange,
          status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      await fetchJobs();
      setShowModal(false);
      
      // Clear fields
      setTitle('');
      setDescription('');
      setDepartment('');
      setLocation('');
      setSalaryRange('');
      setSkills('');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!session || !confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Group jobs by lanes
  const draftJobs = jobs.filter(j => j.status === 'draft');
  const activeJobs = jobs.filter(j => j.status === 'active');
  const closedJobs = jobs.filter(j => j.status === 'closed');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Retrieving Job board pipeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      <header className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Job Openings</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage, add, and archive job requirements mapped to AI ranking pipelines.</p>
        </div>
      </header>

      {/* Kanban lanes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Lane: Draft */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2 px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <h3 className="text-xs uppercase font-mono-technical font-bold tracking-widest text-on-surface-variant">Draft ({draftJobs.length})</h3>
          </div>
          <div className="space-y-4">
            {draftJobs.map((job) => (
              <div key={job.id} className="glass-card p-5 rounded-2xl bg-white/5 border border-white/10 relative group">
                <button onClick={() => handleDeleteJob(job.id)} className="absolute right-4 top-4 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <h4 className="font-bold text-white text-base mb-1">{job.title}</h4>
                <p className="text-xs text-on-surface-variant">{job.department} • {job.location}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills_required.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {draftJobs.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No drafts.</p>}
          </div>
        </section>

        {/* Lane: Active */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2 px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
            <h3 className="text-xs uppercase font-mono-technical font-bold tracking-widest text-primary">Active Openings ({activeJobs.length})</h3>
          </div>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="glass-card p-5 rounded-2xl bg-white/5 border border-primary/20 relative group shadow-lg">
                <button onClick={() => handleDeleteJob(job.id)} className="absolute right-4 top-4 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <h4 className="font-bold text-white text-base mb-1">{job.title}</h4>
                <p className="text-xs text-on-surface-variant">{job.department} • {job.location}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills_required.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {activeJobs.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No active openings.</p>}
          </div>
        </section>

        {/* Lane: Closed */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2 px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <h3 className="text-xs uppercase font-mono-technical font-bold tracking-widest text-on-surface-variant">Closed / Filled ({closedJobs.length})</h3>
          </div>
          <div className="space-y-4">
            {closedJobs.map((job) => (
              <div key={job.id} className="glass-card p-5 rounded-2xl bg-white/5 border border-white/10 opacity-60 relative group">
                <button onClick={() => handleDeleteJob(job.id)} className="absolute right-4 top-4 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <h4 className="font-bold text-white text-base mb-1 line-through">{job.title}</h4>
                <p className="text-xs text-on-surface-variant">{job.department} • {job.location}</p>
              </div>
            ))}
            {closedJobs.length === 0 && <p className="text-xs text-on-surface-variant text-center py-4">No closed entries.</p>}
          </div>
        </section>

      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-[60]">
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-bold rounded-full shadow-[0_15px_40px_rgba(181,196,255,0.4)] hover:scale-105 transition-all cursor-pointer relative"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="text-sm font-semibold">Post New Job</span>
        </button>
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#07080a]/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="glass-card w-full max-w-[520px] p-8 rounded-2xl bg-[#0c0d12] border border-white/15 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <header className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Post New Job opening</h2>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Job Title</label>
                  <input 
                    type="text" required placeholder="Sr. Software Architect" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Department</label>
                  <input 
                    type="text" required placeholder="Engineering" value={department} onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Location</label>
                  <input 
                    type="text" required placeholder="San Francisco, CA" value={location} onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Salary Range</label>
                  <input 
                    type="text" placeholder="$150k - $200k" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Employment Type</label>
                  <select 
                    value={type} onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none text-xs"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant uppercase ml-1">Experience Level</label>
                  <select 
                    value={expLevel} onChange={(e) => setExpLevel(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none text-xs"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Skills Required (Comma separated)</label>
                <input 
                  type="text" required placeholder="TypeScript, Go, Kubernetes, AWS" value={skills} onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">Job Description</label>
                <textarea 
                  required placeholder="Enter detailed job requirements..." value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary text-xs resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant uppercase ml-1">State status</label>
                <div className="flex gap-4">
                  {(['active', 'draft', 'closed'] as const).map((st) => (
                    <button
                      key={st} type="button" onClick={() => setStatus(st)}
                      className={`py-1.5 px-4 text-xs font-semibold rounded-xl border transition-all uppercase ${
                        status === st ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" disabled={submitting}
                className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 mt-2 text-xs"
              >
                {submitting ? 'Creating Job...' : 'Create Job opening'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default JobBoard;
