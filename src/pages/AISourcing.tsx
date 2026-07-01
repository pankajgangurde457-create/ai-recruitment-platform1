import React, { useState, useRef } from 'react';
import { aiService } from '../hooks/aiService';

export const AISourcing: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressText, setProgressText] = useState('Initializing scan...');
  
  const [extractedInsights, setExtractedInsights] = useState<{
    skills: Array<{ name: string; level: string }>;
    summary: string;
    matchPercentage: number | null;
  }>({
    skills: [
      { name: 'Architecture Design', level: 'Expert' },
      { name: 'Go / Microservices', level: 'Senior' },
      { name: 'NoSQL / MongoDB', level: 'Mid-Level' }
    ],
    summary: '',
    matchPercentage: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const candidates = [
    {
      role: 'Senior React Lead',
      location: 'San Francisco, CA',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBotm8mLjpZNGSpdqQqdReJ-OSTwvz1yYZKKV7WMWlNeoeqjI71UneHOje0jeNxL_9p3l8Hb1ZTfG1AGU7y0SZ4IjnIhECsKXNZKpHySdY-MxfnF9Il4fJwga_7OtKjMHiEKZoMb3w5EBExJkUXQNUyGyWSCsmspjoxMDlsjKc1nruGaHsd7hzYLHqMLVa6DJ3P3ttCeVHCbtqqV-Ze7WURXURy67MEXTRyfKQn_txRxN0Hxd3wfgvxiQU1wnk-Dwz3AAhc1pr5H2WH',
      match: 98,
      tags: ['TypeScript', 'Next.js', 'AWS', 'GraphQL'],
      desc: 'Experienced full-stack developer with 8+ years building scalable SaaS applications. Previously at unicorn-stage startups.',
      initials: 'AI',
    },
    {
      role: 'Staff ML Engineer',
      location: 'London, UK (Remote)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRz-U25JD1pcHIJ-hDorIq7DvJHhxz9tLhlK9eXKBKGlhTav0oXXIojqIJbXYvZXibOSYMWvVcy-dAyy5A9KzYykdEbTrLfe8B4Xdu6NXUkj-zDYa5fYcjLjmLYCAnG8piLhcD-8oI1_sVmmXQgvre_L-OghZTDOpGmV1z0zJ0Q4o8xRy0siPLMMqFbKVkyDr-ddStt_pkl6kXHyc3Ar00PmkkYR186CZvChaoYDKTTBXFaQrr-DWBWwEItReRh87PTh0DghcMDHvV',
      match: 94,
      tags: ['PyTorch', 'LLMs', 'Rust'],
      desc: 'Research background with focus on distributed systems and high-throughput model inference. Author of 3 open-source libraries.',
      initials: 'PH',
      isML: true,
    },
  ];

  const gems = [
    { title: 'Product Architect', note: 'Strong unconventional background', fit: 89 },
    { title: 'UX Researcher', note: 'Recently active candidate', fit: 87 },
    { title: 'DevOps Lead', note: 'Undervalued skill set', fit: 91 },
  ];

  const handleUploadClick = () => {
    if (isUploading) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setProgressText('Reading resume file...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;

        setProgressText('Parsing metadata...');
        setUploadProgress(20);
        await new Promise((r) => setTimeout(r, 600));

        setProgressText('Extracting skills and history...');
        setUploadProgress(50);
        await new Promise((r) => setTimeout(r, 600));

        setProgressText('Analyzing technical depth...');
        setUploadProgress(80);
        await new Promise((r) => setTimeout(r, 600));

        setProgressText('Running AI matching model...');
        setUploadProgress(95);

        const parsedResult = await aiService.parseResume(text || file.name);
        setExtractedInsights({
          skills: parsedResult.skills,
          summary: parsedResult.summary,
          matchPercentage: parsedResult.matchPercentage
        });
        setUploadProgress(100);
        setProgressText('Analysis complete!');
      } catch (err) {
        console.error('Resume parse error:', err);
        setProgressText('Extraction error');
      } finally {
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      console.error('Failed to read file');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-stack-xl">
      {/* Filter Bar */}
      <section className="flex flex-wrap items-center gap-4 mb-stack-xl">
        <button className="glass-pane px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all group cursor-pointer text-sm">
          <span className="text-label-caps font-label-caps text-on-surface-variant group-hover:text-primary">Experience</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="glass-pane px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all group cursor-pointer text-sm">
          <span className="text-label-caps font-label-caps text-on-surface-variant group-hover:text-primary">Skills</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="glass-pane px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all group cursor-pointer text-sm">
          <span className="text-label-caps font-label-caps text-on-surface-variant group-hover:text-primary">Location</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="glass-pane px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all group cursor-pointer text-sm">
          <span className="text-label-caps font-label-caps text-on-surface-variant group-hover:text-primary">Salary</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="glass-pane px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all group cursor-pointer text-sm">
          <span className="text-label-caps font-label-caps text-on-surface-variant group-hover:text-primary">Remote</span>
          <span className="material-symbols-outlined text-sm">toggle_on</span>
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-primary font-mono-technical">
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          <span>AI-Powered Ranking Active</span>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Column: Recommendations */}
        <div className="col-span-12 lg:col-span-8 space-y-stack-lg">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold mb-1">Smart Recommendations</h2>
              <p className="text-on-surface-variant text-body-base">Top 12 candidates matching your current technical requirements.</p>
            </div>
            <button className="text-primary flex items-center gap-1 hover:underline cursor-pointer">
              <span className="text-label-caps font-label-caps">Refresh Feed</span>
              <span className="material-symbols-outlined text-sm">sync</span>
            </button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {candidates.map((cand, idx) => (
              <div 
                key={idx} 
                className={`glass-pane rounded-3xl p-6 group cursor-pointer hover:shadow-[0_20px_50px_rgba(181,196,255,0.15)] transition-all duration-500 relative overflow-hidden ${
                  cand.isML ? '' : 'ai-glow-border'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-white/10">
                      <img className="w-full h-full object-cover" alt={cand.role} src={cand.avatar} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{cand.role}</h3>
                      <p className="text-on-surface-variant text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span> {cand.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      cand.isML 
                        ? 'bg-tertiary/10 text-tertiary border-tertiary/20' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {cand.match}% Match
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {cand.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="milled-glass px-2 py-1 rounded text-[10px] uppercase font-bold text-on-surface-variant bg-white/5 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">{cand.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-tertiary-container border border-surface flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                    {!cand.isML && <div className="w-6 h-6 rounded-full bg-secondary-container border border-surface flex items-center justify-center text-[10px] font-bold text-white">HR</div>}
                  </div>
                  <button className="bg-white/5 hover:bg-primary hover:text-on-primary px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Gems Section */}
          <div className="pt-stack-lg">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-md flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">diamond</span>
              Hidden Gems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {gems.map((gem, idx) => (
                <div key={idx} className="milled-glass bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer border-l-2 border-primary/40">
                  <p className="font-bold text-sm mb-1 truncate text-on-surface">{gem.title}</p>
                  <p className="text-on-surface-variant text-xs mb-3">{gem.note}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-mono-technical text-[10px]">{gem.fit}% Fit</span>
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Resume Parser */}
        <div className="col-span-12 lg:col-span-4 space-y-stack-lg">
          <div className="glass-pane rounded-3xl p-8 sticky top-24 border-primary/20">
            <h2 className="font-headline-md text-headline-md font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">cloud_upload</span>
              AI Resume Parser
            </h2>

            {/* Drag & Drop Area */}
            <div 
              onClick={handleUploadClick}
              className="relative group h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.02] hover:bg-primary/[0.03] hover:border-primary transition-all cursor-pointer overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept=".txt,.pdf,.doc,.docx,.json,.md"
              />
              {isUploading && (
                <div className="scanning-line absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-[#b5c4ff] to-transparent"></div>
              )}
              
              {!isUploading ? (
                <div className="z-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                  </div>
                  <div>
                    <p className="font-bold">Drop resume here</p>
                    <p className="text-on-surface-variant text-xs">PDF, DOCX, or JSON up to 10MB</p>
                  </div>
                  <button className="text-primary text-label-caps font-label-caps underline cursor-pointer">Browse Files</button>
                </div>
              ) : (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container/90 p-8">
                  <p className="font-mono-technical text-primary mb-4">{progressText}</p>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-4">AI extraction in progress</p>
                </div>
              )}
            </div>

            {/* Extraction Result Area */}
            <div className="mt-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">Extracted Insights</h3>
                {extractedInsights.matchPercentage !== null && (
                  <span className="text-xs font-bold text-primary">{extractedInsights.matchPercentage}% Match</span>
                )}
              </div>
              
              {extractedInsights.summary && (
                <p className="text-xs text-on-surface-variant leading-relaxed p-3 bg-white/5 border border-white/5 rounded-xl">
                  {extractedInsights.summary}
                </p>
              )}

              <div className="space-y-4">
                {extractedInsights.skills.map((skill, sIdx) => {
                  const iconMap: Record<string, string> = {
                    'architecture': 'account_tree',
                    'go': 'terminal',
                    'nosql': 'database',
                    'database': 'database',
                    'design': 'palette',
                    'react': 'code',
                    'typescript': 'code',
                  };
                  const skillKey = skill.name.toLowerCase();
                  let icon = 'terminal';
                  for (const [key, iconVal] of Object.entries(iconMap)) {
                    if (skillKey.includes(key)) {
                      icon = iconVal;
                      break;
                    }
                  }
                  return (
                    <div key={sIdx} className="flex items-center justify-between group cursor-pointer py-1">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
                        <span className="text-sm">{skill.name}</span>
                      </div>
                      <span className="text-primary text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">{skill.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AISourcing;
