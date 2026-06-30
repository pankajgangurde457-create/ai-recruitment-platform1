import React from 'react';

export const JobBoard: React.FC = () => {
  const draftJobs = [
    {
      id: '#882',
      title: 'Staff Product Designer',
      team: 'Growth Team • Series C',
      applicants: 0,
      location: 'Remote',
      icon: 'rocket_launch',
    },
    {
      id: '#901',
      title: 'Data Engineer',
      team: 'Analytics Infrastructure',
      applicants: 0,
      location: 'London, UK',
      icon: 'database',
    },
  ];

  const openJobs = [
    {
      id: '#870',
      title: 'Sr. Backend Architect',
      team: 'FinTech Core • High Frequency',
      applicants: 42,
      location: 'San Francisco',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzTOlJOU3sleTkLYQsP5oavda4w5OTb8Zp5xGK-tlViV_l0l3k16kGXnTgjs8vigijS0XoLZEiv04tGi0h4meHexzmAGMe8BWmG9X539WnCOQ7dXU0DQWnBY2yggkFdaE6ExUxorarEGbmQTMCdMmX_0PdWpoQ7OuzK7dJhlTwlU1Z2E7D3pXstufNokcZxH7vHbALILkzOXvJ-Cd_whrUqWiCBZAR921ne1ZkdFA3zvwfp_uIIIE7N_ztMYWvtve7uaP57kVcRKgZ',
      match: '98% AI Match',
      bars: [true, true, true, false],
      isActive: true,
    },
    {
      id: '#877',
      title: 'Machine Learning Lead',
      team: 'Recommendation Engine',
      applicants: 18,
      location: 'Hybrid',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl28gUb8r8vlqLlXei6HFTLQrsY1rqGCI-lEgqd1yJk_AApUiiNq9nfz8ky1cpxeopVnJZelQ3C3HjfnKce00ctz1x6F_b76fWW5u2VJ1AhxHbHkILLYUvQOWGN7lwBvg19frET3Nj8xJlXVD2-0Gu7KbcXKx3jiIqhreL-TMkJD0-qpcOUK2zvxT0cb0gi5SZa4-s2OI2nrkw3tt9vL57H20Xxp6xcS0PG-VHSYnhABGjStobAhNdkcIeCgaxpOdI6if73kn26rrl',
      match: '85% AI Match',
      bars: [true, true, false, false],
    },
  ];

  const inReviewJobs = [
    {
      id: '#855',
      title: 'Head of Sustainability',
      team: 'Global Ops • ESG Team',
      applicants: 126,
      location: 'Berlin, DE',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG4lLuZU67juR1koxmaQ3k86-nt8DsOQxKHXHQVw4nzjx06UCR0af9ZW8Ky9PW5z2i4-mXgXBQSqUFCfULE4XpCSyNc5DlEtNR4XyQBngcbxGELqv7ZGDjK0r6S62EIjkpvca1coaQWIl53Pok9BiJtnXZRryzCZwOjZPZeLpMQ7N5mQU0cEkbnGsNJgxyNBSXpTe-EPXO9lFYJH0nR1PIthpHuREvCct4qO832gaVkpF0nVYkfKsmQ1wSOtrh2f_GvV__9oXeXgCT',
      initials: ['JD', 'MK', 'AL'],
    },
  ];

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-100px)] overflow-hidden">
      {/* Header */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Job Pipeline</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Managing 12 active positions across 4 stages</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-pointer text-on-surface">
            <span className="material-symbols-outlined text-sm">sort</span>
            Sort
          </button>
        </div>
      </header>

      {/* Kanban Columns */}
      <section className="flex-grow overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          
          {/* Column: Draft */}
          <div className="w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-on-surface-variant/30"></div>
                <span className="font-label-caps text-on-surface-variant text-xs font-semibold">DRAFT</span>
                <span className="bg-surface-container text-xs px-2 py-0.5 rounded-full text-on-surface-variant/60">3</span>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-base">more_horiz</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {draftJobs.map((job, idx) => (
                <div key={idx} className="glass-pane p-5 rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-500 group cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-xl">{job.icon}</span>
                    </div>
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-on-surface-variant">ID: {job.id}</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-4">{job.team}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">group</span>
                      <span className="text-xs font-mono-technical">{job.applicants}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span className="text-xs font-mono-technical">{job.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Open */}
          <div className="w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#b5c4ff]"></div>
                <span className="font-label-caps text-primary text-xs font-semibold">OPEN</span>
                <span className="bg-primary/10 text-xs px-2 py-0.5 rounded-full text-primary font-bold">4</span>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-base">add_circle</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {openJobs.map((job, idx) => (
                <div 
                  key={idx} 
                  className={`glass-pane p-5 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500 group cursor-grab ${
                    job.isActive ? 'ai-glow-border shadow-2xl bg-surface-container/40' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" alt={job.title} src={job.logo} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] bg-primary/10 px-2 py-1 rounded text-primary font-bold">{job.match}</span>
                      {job.bars && (
                        <div className="mt-1 flex gap-0.5">
                          {job.bars.map((filled, bIdx) => (
                            <span key={bIdx} className={`w-1 h-3 rounded-full ${filled ? 'bg-primary' : 'bg-white/20'}`}></span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-4">{job.team}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-xs">group</span>
                      <span className="text-xs font-mono-technical">{job.applicants} Applicants</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span className="text-xs font-mono-technical">{job.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: In Review */}
          <div className="w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-fixed"></div>
                <span className="font-label-caps text-on-surface-variant text-xs font-semibold">IN REVIEW</span>
                <span className="bg-surface-container text-xs px-2 py-0.5 rounded-full text-on-surface-variant/60">5</span>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-base">more_horiz</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {inReviewJobs.map((job, idx) => (
                <div key={idx} className="glass-pane p-5 rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-500 group cursor-grab">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" alt={job.title} src={job.logo} />
                    </div>
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-on-surface-variant">Top Priority</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-4">{job.team}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-xs">group</span>
                      <span className="text-xs font-mono-technical">{job.applicants} Applicants</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span className="text-xs font-mono-technical">{job.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex -space-x-2">
                    {job.initials.map((init, iIdx) => (
                      <div key={iIdx} className="w-6 h-6 rounded-full border border-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {init}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Closed */}
          <div className="w-80 flex flex-col gap-4 opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <span className="font-label-caps text-on-surface-variant text-xs font-semibold">CLOSED</span>
                <span className="bg-surface-container text-xs px-2 py-0.5 rounded-full text-on-surface-variant/60">24</span>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-base">history</span>
              </button>
            </div>
            
            <div className="glass-pane p-5 rounded-xl border-dashed border-white/10 shadow-sm transition-all duration-500 group">
              <h3 className="font-bold text-on-surface-variant text-sm mb-1 line-through">DevOps Engineer</h3>
              <p className="text-xs text-on-surface-variant/60 mb-4">Platform Team • Filled</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-wider">Hired: Robert Fox</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-[60]">
        <button className="flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-bold rounded-full shadow-[0_15px_40px_rgba(181,196,255,0.4)] hover:shadow-[0_20px_50px_rgba(181,196,255,0.6)] transition-all duration-300 transform active:scale-95 group cursor-pointer relative">
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-500">add</span>
          <span className="font-body-base text-sm font-semibold">Post New Job</span>
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping pointer-events-none opacity-20"></div>
        </button>
      </div>
    </div>
  );
};
export default JobBoard;
