import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../hooks/aiService';
import { useAuth } from '../context/AuthContext';

interface Job {
  id: string;
  title: string;
  department: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
  education: string;
  summary: string;
}

export const AISourcing: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressText, setProgressText] = useState('Initializing scan...');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  
  const [extractedInsights, setExtractedInsights] = useState<{
    name: string;
    skills: string[];
    summary: string;
    matchScore: number | null;
  }>({
    name: '',
    skills: [],
    summary: '',
    matchScore: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load jobs and candidates list
  const loadData = async () => {
    if (!session) return;
    try {
      const jobsRes = await fetch('http://localhost:5000/api/jobs', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const jobsData = await jobsRes.json();
      setJobs(jobsData || []);
      if (jobsData && jobsData.length > 0) {
        setSelectedJobId(jobsData[0].id);
      }

      const candRes = await fetch('http://localhost:5000/api/candidates', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const candData = await candRes.json();
      setCandidates(candData || []);
    } catch (err) {
      console.error('Failed to load sourcing data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [session]);

  const handleUploadClick = () => {
    if (isUploading) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);
    setProgressText('Uploading file & extracting text...');

    try {
      // 1. Upload and parse resume on backend
      setUploadProgress(40);
      setProgressText('Parsing candidate metadata using Gemini...');
      const uploadResult = await aiService.parseResume(file);
      const candidate = uploadResult.candidate;

      setUploadProgress(70);
      let score = null;

      // 2. Score candidate against selected job
      if (selectedJobId) {
        setProgressText(`Calculating match compatibility for Job...`);
        const scoring = await aiService.applyAndScoreCandidate(candidate.id, selectedJobId);
        score = scoring.evaluation?.score || null;
      }

      setUploadProgress(100);
      setProgressText('Analysis complete!');
      setExtractedInsights({
        name: candidate.name,
        skills: candidate.skills,
        summary: candidate.summary,
        matchScore: score
      });

      // Reload candidates list
      await loadData();
    } catch (err: any) {
      console.error('Resume upload error:', err);
      setProgressText('Parsing failed: ' + (err.message || 'Error'));
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      {/* Sourcing Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">AI Sourcing Pipeline</h1>
          <p className="text-sm text-on-surface-variant mt-1">Upload resumes, map targets, and evaluate fits using Gemini intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase font-mono-technical text-on-surface-variant font-bold">Target Job Map:</label>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.department})
              </option>
            ))}
            {jobs.length === 0 && <option value="">No Active Jobs Available</option>}
          </select>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Candidates list */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Parsed Candidates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidates.map((cand) => (
              <div 
                key={cand.id} 
                className="glass-card rounded-3xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">{cand.name}</h3>
                      <p className="text-xs text-on-surface-variant">{cand.email}</p>
                    </div>
                    <span className="text-xs font-mono-technical text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-md">
                      {cand.experience_years} Yrs Exp
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#8a8b94] line-clamp-3 leading-relaxed mb-4">
                    {cand.summary || 'No summary extracted.'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cand.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button 
                    onClick={() => navigate(`/candidate/${cand.id}`)}
                    className="bg-primary text-on-primary hover:bg-primary/90 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            ))}
            {candidates.length === 0 && (
              <div className="col-span-2 text-center py-12 text-on-surface-variant text-sm border border-dashed border-white/10 rounded-2xl">
                <span className="material-symbols-outlined text-4xl mb-2">face</span>
                <p>No candidates parsed yet. Upload resume documents to trigger AI parser extraction.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upload Parser */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 bg-white/5 border border-white/10 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">upload</span>
              <span>Upload Document</span>
            </h3>

            <div 
              onClick={handleUploadClick}
              className="group h-48 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary transition-all cursor-pointer relative overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept=".pdf,.docx"
              />

              {isUploading ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0c0d12]/95 p-4 text-center">
                  <div className="w-10 h-10 border-2 border-t-primary border-primary/20 rounded-full animate-spin mb-3"></div>
                  <p className="font-mono-technical text-xs text-primary mb-2 animate-pulse">{progressText}</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2 p-4">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant">upload_file</span>
                  <p className="text-sm font-bold text-white">Click or drag resume</p>
                  <p className="text-[10px] text-on-surface-variant">Supports PDF, DOCX up to 10MB</p>
                </div>
              )}
            </div>

            {/* Extracted result details */}
            {extractedInsights.name && (
              <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <div>
                  <p className="text-[10px] uppercase font-mono-technical tracking-widest text-on-surface-variant">Candidate Extracted</p>
                  <h4 className="text-base font-bold text-white mt-1">{extractedInsights.name}</h4>
                  {extractedInsights.matchScore !== null && (
                    <span className="inline-block text-xs font-bold text-green-400 mt-1">
                      {extractedInsights.matchScore}% Compatibility Score
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[10px] uppercase font-mono-technical tracking-widest text-on-surface-variant">Gemini Summary</p>
                  <p className="text-xs text-[#8a8b94] leading-relaxed mt-1">{extractedInsights.summary}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AISourcing;
