import React, { useState } from 'react';

export const TalentPipeline: React.FC = () => {
  const [aiScoreThreshold, setAiScoreThreshold] = useState(85);

  const appliedCandidates = [
    {
      name: 'Sarah Jenkins',
      role: 'Senior Frontend',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAQmo6N0avkARus40TpG0IgRC8BGNy3vuMuV3vm9j5LOGmgzVMzu99Y2faahith1dwzunv1SXAR4mOpG09Gv-Niwknys5krJpIlcCYdMx-PwE8j7AK2DSasYlk7F1cfpZ5TjHfAp_zy-pu8TEaEV8H0r2fTnHxXYUM7NrjTuhaJkqTlaHAbPsKf1Yb6KOTzoT0HQoN5ThdsGYa1xcesMopmZ3Bn_Wgkv23HS7shJfqFOsPDVpsFhmFJss9cZImHVRbTkl4B9JEl5Lq',
      match: 98,
      experience: '8y Exp.',
      initials: 'SJ',
    },
    {
      name: 'Marcus Thorne',
      role: 'Frontend Engineer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvE5PXcD3dDg2jee6mDxq7-SiVGg88-v5-lYmQwBWqR_G6pmxQvUN8eOTY9_wo2aKg1zr1haJ03-T2WIn5PdlbEqO4pYAUmqhCL0sPXb_E8iRhDsP41PutBtvuqP3fbiby-ERMo1rwQscN0eP-f1qxpFrBmfQW-bA2mswsp9NoiYR626hfkrRoQKlhSvKaVf2ZNXqXasqTf9CDLXUfhgfr1uFSgRk7S5fWMctCgXcp325WOm6vjaWzXbMiajqWt-IBhVrhcii2Bp5C',
      match: 92,
      experience: '5y Exp.',
      initials: 'AW',
    },
  ];

  const screeningCandidates = [
    {
      name: 'Elena Rossi',
      role: 'Design Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Mb1AIkaYdQyw4VbFtqkBs7l-_KuGW3CnCpEmbaYk9HFmn9ZBzu08t90HvpWK3qXKGBQ0D2AHV0UiCUSTStevayvmaF0xSvgTYUQ-S5aqa733McMKHq8fj_-1nQVMjMbjonSxeGIn3jjvPr6dCipVp6IvRw4fKzMSqh_n2CnziOywf1PLAMJ6qWRHychkfn8hjGC9iNzcDUeUg4DRQ4XjHVhdGVSz3YsNetWPrbN-Vr1r5K7yUnIC3zc9Rp_H3wglmEWvNOxlVkYS',
      match: 95,
      time: 'Today 2:00 PM',
      initials: 'ER',
    },
  ];

  const interviewCandidates = [
    {
      name: 'David Cho',
      role: 'AI Specialist',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr2ZQsLkFkY2FdsZ6FPjTcgwQ4XhEhVELTNJW9iW6AIWZAaCd9QPC1bL58yM3bQHN3xz9DwZ_XEuc6zqaENr0jRu5eRdlpchHrTJE2bjTeW9AoZnHkryWQdd4o1aj57F0xIcPn4XMyYh_Yi_5OlkzlX1oaNHZSu7fZAI6cg0yzNwZVzwH7ndJFE6EmEq2zDueeQc2cVZmQCk6aWLqbj2VouU35qnerTnWPAniwqpiwjRuxtiXbqrMffzs_k5WNlpVhV9U3DY3EjGCE',
      match: 99,
      priority: 'High Priority',
      initials: 'DC',
    },
  ];

  const hiredCandidates = [
    {
      name: 'Julianne Moore',
      role: 'Product Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQzIqAxG9ksB427G3V0O_23ZpJOLga8e0yhVeW7EFTac5dDszfLkUEunXPWT94kkGfFozwvmwFL4fuDU0wlVkBzzjKDQnY3OheyIDtVJ8xF8JG19oC-WlbtsPnfqfhwCRS9_oR-uzdjuVa9rTXiwHj1FPMRhVBdE3xdB2Luw6_-dGouC5GlVh1q-B0ZEeP-5CGCMLv6xAru4bx409GIVGw66wz_jdUuyRpU1lduWQsxatBFlMIwvjy3In5tLl9RIvQ5SBz_x9R-wdk',
      hired: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden min-h-[calc(100vh-100px)]">
      {/* Filter Header */}
      <section className="py-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60">Department</label>
            <select className="bg-surface-container/60 border border-white/10 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-0 focus:border-primary cursor-pointer hover:bg-surface-container transition-colors text-on-surface">
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60">Job Role</label>
            <select className="bg-surface-container/60 border border-white/10 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-0 focus:border-primary cursor-pointer hover:bg-surface-container transition-colors text-on-surface">
              <option>Senior Frontend Engineer</option>
              <option>Senior Product Manager</option>
              <option>AI Researcher</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60">Experience</label>
            <select className="bg-surface-container/60 border border-white/10 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-0 focus:border-primary cursor-pointer hover:bg-surface-container transition-colors text-on-surface">
              <option>5+ Years</option>
              <option>8+ Years</option>
              <option>10+ Years</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60">AI Score</label>
            <div className="flex items-center gap-2 bg-surface-container/60 border border-white/10 rounded-lg py-2 px-3">
              <span className="text-sm font-mono-technical text-primary">&gt; {aiScoreThreshold}%</span>
              <input 
                className="w-20 accent-primary h-1 bg-white/10 rounded-full appearance-none cursor-pointer" 
                type="range"
                min="50"
                max="99"
                value={aiScoreThreshold}
                onChange={(e) => setAiScoreThreshold(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm font-semibold cursor-pointer">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            More Filters
          </button>
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <button className="p-2 bg-primary/10 text-primary cursor-pointer">
              <span className="material-symbols-outlined text-base">view_kanban</span>
            </button>
            <button className="p-2 hover:bg-white/5 text-on-surface-variant cursor-pointer">
              <span className="material-symbols-outlined text-base">view_list</span>
            </button>
          </div>
        </div>
      </section>

      {/* Kanban Board */}
      <section className="flex-grow overflow-x-auto py-8">
        <div className="flex gap-6 h-full pb-4 overflow-y-hidden">
          {/* Column: Applied */}
          <div className="w-80 flex flex-col h-full rounded-2xl bg-surface-container-lowest/30 p-3 border border-white/5">
            <div className="flex items-center justify-between px-2 py-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Applied</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">12</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary cursor-pointer">
                <span className="material-symbols-outlined text-lg">more_horiz</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {appliedCandidates.map((candidate, idx) => (
                <div key={idx} className="glass-card p-4 rounded-xl cursor-grab active:cursor-grabbing hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5" alt={candidate.name} src={candidate.avatar} />
                      <div>
                        <p className="text-sm font-bold leading-tight">{candidate.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{candidate.role}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-technical text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{candidate.match}% Match</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">work_history</span>
                      <span>{candidate.experience}</span>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container ring-2 ring-surface-dim">
                      {candidate.initials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Screening */}
          <div className="w-80 flex flex-col h-full rounded-2xl bg-surface-container-lowest/30 p-3 border border-white/5">
            <div className="flex items-center justify-between px-2 py-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Screening</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">4</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {screeningCandidates.map((candidate, idx) => (
                <div key={idx} className="glass-card p-4 rounded-xl cursor-grab hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all relative">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5" alt={candidate.name} src={candidate.avatar} />
                      <div>
                        <p className="text-sm font-bold leading-tight">{candidate.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{candidate.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-technical text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{candidate.match}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span>{candidate.time}</span>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-on-primary-container ring-2 ring-surface-dim">
                      {candidate.initials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Interview */}
          <div className="w-80 flex flex-col h-full rounded-2xl bg-surface-container-lowest/30 p-3 border border-white/5">
            <div className="flex items-center justify-between px-2 py-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Interview</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">8</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {interviewCandidates.map((candidate, idx) => (
                <div key={idx} className="glass-card p-4 rounded-xl cursor-grab hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5" alt={candidate.name} src={candidate.avatar} />
                      <div>
                        <p className="text-sm font-bold leading-tight">{candidate.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{candidate.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-technical text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{candidate.match}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-error-container/20 text-error px-2 py-0.5 rounded">{candidate.priority}</span>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container ring-2 ring-surface-dim">
                      {candidate.initials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Offer */}
          <div className="w-80 flex flex-col h-full rounded-2xl bg-surface-container-lowest/30 p-3 border border-white/5">
            <div className="flex items-center justify-between px-2 py-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Offer</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">2</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <div className="h-32 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-on-surface-variant/30 text-xs">
                Drop candidate here
              </div>
            </div>
          </div>

          {/* Column: Hired */}
          <div className="w-80 flex flex-col h-full rounded-2xl bg-surface-container-lowest/30 p-3 border border-white/5">
            <div className="flex items-center justify-between px-2 py-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Hired</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-on-surface-variant">24</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {hiredCandidates.map((candidate, idx) => (
                <div key={idx} className="glass-card p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 relative">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5" alt={candidate.name} src={candidate.avatar} />
                      <div>
                        <p className="text-sm font-bold leading-tight">{candidate.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{candidate.role}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-lg">verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Add Candidate Button */}
      <button className="fixed bottom-10 right-10 flex items-center gap-3 px-6 py-4 bg-primary text-on-primary rounded-full shadow-[0_10px_30px_rgba(100,138,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 z-50 group cursor-pointer">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
        <span className="font-bold tracking-tight">Add Candidate</span>
      </button>

      {/* Floating AI Summary Widget */}
      <div className="fixed bottom-10 left-80 w-80 glass-card p-5 rounded-2xl border border-primary/20 shadow-2xl z-40 hidden md:block">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-primary to-tertiary rounded-2xl opacity-10 animate-pulse pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">AI Pipeline Summary</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Screening models indicate <b>Alex Rivera</b> is ready for technical round. Sourcing runs have added 14 new candidates to screening.
        </p>
      </div>
    </div>
  );
};
export default TalentPipeline;
