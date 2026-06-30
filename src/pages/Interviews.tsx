import React, { useState } from 'react';

export const Interviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidate, setCandidate] = useState('Select Candidate...');
  const [interviewer, setInterviewer] = useState('Select Interviewer...');
  const [dateTime, setDateTime] = useState('');
  const [interviewType, setInterviewType] = useState<'remote' | 'in-person'>('remote');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const scheduleList = [
    {
      name: 'Sarah Miller',
      role: 'Product Design',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTJNuoOSekU4seToa6qlGtDUe7K_rSSMibtPeIlPwas0EOWy-ejXXF7gZcVvy241UcwM_fCLUmUFm_hAps50YAjB7ittHZ9DmoIXIps9PotFpU9qjcjRNmgfsyml_l2otqGUZPNo6hzpx6jct-aVF_rTWHCqHZuqf5sgNLr70FIjJvqy5BDpXbxdWtLUJtVh1kVBFtWFJ8n9ZRGnEIEq9rbsKNuyvO5E40q803mphxNeDjz0JUP1M75uhX3UXOVgMRCUgthbH87gHY',
      time: '09:00 - 10:00',
      host: 'M. Chen',
      type: 'video',
    },
    {
      name: 'James Wilson',
      role: 'Lead Backend Eng',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASM-DBRxe0rtSJ-t2sUNsTKMgttvv97yFrGtrsQjdAOQlV24R3YdXlkIyOn3VBH81yFAolZCWBmv1k_3T0GV0E3riALmSTCcvrieshjJROTBOuKiXq2ska_AtzqktP80Az6b2vOmFFbEA3gQwWqaZLk1eNNHrt2q2N_NGb0qUeVhMRy6zvn3KSCRIMtVEjNY9-eVuLDLKOLFGbrfvHafXZLB1dZtQERZLtU40IuBF4-62wPdYV6Mh8855pOXNlYx4cVrns2sYAb_Ya',
      time: '13:30 - 14:30',
      host: 'K. Patel',
      type: 'location',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[calc(100vh-100px)] relative z-10">
      
      {/* Left: Main Calendar View */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold mb-1">Interview Calendar</h2>
            <p className="text-on-surface-variant text-body-base">Manage your team's live synchronizations and evaluations.</p>
          </div>
          <button 
            onClick={toggleModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-primary/20 text-sm"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            Schedule Interview
          </button>
        </div>

        {/* Main Calendar Component */}
        <div className="glass-pane rounded-3xl overflow-hidden shadow-2xl bg-surface-container/20">
          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 border-b border-white/5 bg-white/5">
            <div className="p-4 text-center border-r border-white/5 font-label-caps text-on-surface-variant">MON <br/><span className="text-lg text-on-surface font-semibold">14</span></div>
            <div className="p-4 text-center border-r border-white/5 font-label-caps text-on-surface-variant">TUE <br/><span className="text-lg text-on-surface font-semibold">15</span></div>
            <div className="p-4 text-center border-r border-white/5 font-label-caps bg-primary/10 text-primary">WED <br/><span className="text-lg font-bold">16</span></div>
            <div className="p-4 text-center border-r border-white/5 font-label-caps text-on-surface-variant">THU <br/><span className="text-lg text-on-surface font-semibold">17</span></div>
            <div className="p-4 text-center border-r border-white/5 font-label-caps text-on-surface-variant">FRI <br/><span className="text-lg text-on-surface font-semibold">18</span></div>
            <div className="p-4 text-center border-r border-white/5 font-label-caps text-on-surface-variant">SAT <br/><span className="text-lg text-on-surface font-semibold">19</span></div>
            <div className="p-4 text-center font-label-caps text-on-surface-variant">SUN <br/><span className="text-lg text-on-surface font-semibold">20</span></div>
          </div>

          {/* Calendar Rows (Time slots) */}
          <div className="relative h-[480px] overflow-y-auto custom-scrollbar">
            {/* Time Grid Columns */}
            <div className="absolute inset-0 grid grid-cols-7 divide-x divide-white/5 pointer-events-none">
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
            </div>

            {/* Events Overlay */}
            <div className="relative p-2 min-h-full">
              {/* Event 1 */}
              <div className="absolute top-20 left-[28.5%] w-[13%] group cursor-pointer">
                <div className="glass-pane p-3 rounded-xl border-l-4 border-l-primary bg-surface-container-high/80 hover:bg-white/10 transition-all shadow-lg active:scale-95">
                  <p className="text-label-caps text-primary font-bold text-[10px]">09:00 AM</p>
                  <p className="font-semibold text-on-surface text-xs truncate">Sarah Miller</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter truncate">Sr. Product Designer</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="absolute top-60 left-[42.8%] w-[13%] group cursor-pointer">
                <div className="glass-pane p-3 rounded-xl border-l-4 border-l-tertiary bg-surface-container-high/80 hover:bg-white/10 transition-all shadow-lg active:scale-95">
                  <p className="text-label-caps text-tertiary font-bold text-[10px]">01:30 PM</p>
                  <p className="font-semibold text-on-surface text-xs truncate">James Wilson</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter truncate">Lead Backend Eng</p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="absolute top-80 left-[0%] w-[13%] group cursor-pointer opacity-60">
                <div className="glass-pane p-3 rounded-xl border-l-4 border-l-outline bg-surface-container-high/80 hover:bg-white/10 transition-all shadow-lg">
                  <p className="text-label-caps text-outline font-bold text-[10px]">03:00 PM</p>
                  <p className="font-semibold text-on-surface text-xs truncate">Elena Kostic</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter truncate">HR Lead</p>
                </div>
              </div>

              {/* Current Time Indicator */}
              <div className="absolute top-52 left-0 w-full flex items-center pointer-events-none z-10">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 ml-[-6px]"></div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
                <span className="bg-primary text-on-primary text-[9px] px-1.5 py-0.5 rounded ml-auto mr-4 font-bold">NOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quick Actions */}
        <div className="glass-pane p-6 rounded-2xl flex flex-wrap items-center gap-4 bg-surface-container/20">
          <div className="p-3 bg-secondary-container/20 rounded-xl text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Conflict Check</h4>
            <p className="text-[11px] text-on-surface-variant font-label-caps uppercase tracking-wider">3 Potential overlaps detected in your team's sync.</p>
          </div>
          <button className="ml-auto px-4 py-2 border border-white/10 rounded-lg text-label-caps hover:bg-white/5 transition-colors cursor-pointer text-xs font-semibold">
            RESOLVE
          </button>
        </div>
      </div>

      {/* Right Sidebar: Today's Schedule & Upcoming */}
      <aside className="w-full lg:w-80 border border-white/5 bg-surface-container-low/30 backdrop-blur-lg flex flex-col rounded-3xl overflow-hidden self-stretch">
        {/* Today Header */}
        <div className="p-6 border-b border-white/5 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-on-surface text-lg font-bold">Today</h3>
            <span className="text-label-caps text-on-surface-variant text-[11px] font-semibold">Wednesday, 16 Oct</span>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
            <p className="text-label-caps text-primary font-bold mb-1 text-[10px] tracking-wider">INTERVIEW LOAD</p>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[65%]"></div>
            </div>
            <p className="mt-2 text-on-surface-variant text-[10px]">4 Interviews scheduled • 6 hours total</p>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[380px] lg:max-h-none">
          <p className="px-2 font-label-caps text-on-surface-variant uppercase text-[10px] tracking-widest font-semibold opacity-60">Ongoing & Upcoming</p>
          
          {scheduleList.map((sch, idx) => (
            <div key={idx} className={`p-4 rounded-2xl bg-surface-container-high border border-white/5 hover:border-primary/30 transition-all group cursor-pointer ${
              sch.type === 'location' ? 'border-l-4 border-l-tertiary' : ''
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-surface-container">
                    <img className="w-full h-full object-cover" alt={sch.name} src={sch.avatar} />
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface leading-tight text-sm">{sch.name}</p>
                    <p className="text-[11px] text-on-surface-variant">{sch.role}</p>
                  </div>
                </div>
                {sch.type === 'video' ? (
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
                ) : (
                  <span className="material-symbols-outlined text-tertiary text-sm">location_on</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-[10px] text-on-surface-variant border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">timer</span> {sch.time}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">person</span> {sch.host}</span>
              </div>
            </div>
          ))}

          <p className="px-2 font-label-caps text-on-surface-variant uppercase text-[10px] tracking-widest pt-4 font-semibold opacity-60">Pipeline Status</p>
          {/* AI Insight Widget */}
          <div className="p-4 rounded-2xl bg-surface-container-high border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <span className="material-symbols-outlined text-4xl">auto_awesome</span>
            </div>
            <h5 className="text-label-caps font-bold text-primary mb-2 text-[10px] tracking-wider">AI PREVIEW</h5>
            <p className="text-[12px] leading-relaxed text-on-surface mb-3">"Candidate Sarah Miller shows 98% alignment with your core design values."</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-label-caps text-[10px] transition-colors cursor-pointer font-bold">VIEW SUMMARY</button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 bg-surface-container-lowest/80 border-t border-white/5 mt-auto">
          <button className="w-full py-3 rounded-xl border border-white/10 hover:border-primary/50 text-sm font-semibold flex items-center justify-center gap-2 group transition-all cursor-pointer">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">add_box</span>
            Bulk Schedule
          </button>
        </div>
      </aside>

      {/* Modal: Schedule Interview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleModal}></div>
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">Schedule New Interview</h3>
                <p className="text-on-surface-variant text-sm mt-1">Set up a session and generate AI-driven questions.</p>
              </div>
              <button className="text-on-surface-variant hover:text-white cursor-pointer" onClick={toggleModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); toggleModal(); }} className="p-8 space-y-6">
              {/* Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-wider block">CANDIDATE</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none"
                      value={candidate}
                      onChange={(e) => setCandidate(e.target.value)}
                    >
                      <option>Select Candidate...</option>
                      <option>Sarah Miller</option>
                      <option>James Wilson</option>
                      <option>Marcus Kael</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-wider block">INTERVIEWER</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none"
                      value={interviewer}
                      onChange={(e) => setInterviewer(e.target.value)}
                    >
                      <option>Select Interviewer...</option>
                      <option>Alex Rivera (Me)</option>
                      <option>Maya Chen</option>
                      <option>Kevin Patel</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Date & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-wider block">DATE & TIME</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-1 focus:ring-primary focus:border-primary" 
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-wider block">INTERVIEW TYPE</label>
                  <div className="flex gap-2 p-1 bg-surface-container rounded-xl border border-white/10">
                    <button 
                      type="button"
                      onClick={() => setInterviewType('remote')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        interviewType === 'remote' ? 'bg-primary-container/20 text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      REMOTE
                    </button>
                    <button 
                      type="button"
                      onClick={() => setInterviewType('in-person')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        interviewType === 'in-person' ? 'bg-primary-container/20 text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      IN-PERSON
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Questions Preview */}
              <div className="ai-glow-border rounded-2xl p-6 bg-surface-container-highest/50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <h4 className="font-semibold text-on-surface text-sm">AI Question Preview</h4>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3 text-on-surface/80">
                    <span className="text-primary font-bold">01.</span>
                    "How would you integrate our core 'Frictionless' value into the hiring platform's onboarding?"
                  </li>
                  <li className="flex gap-3 text-on-surface/80">
                    <span className="text-primary font-bold">02.</span>
                    "Describe a time you handled complex data visualizations with high performance requirements."
                  </li>
                </ul>
                <button type="button" className="mt-4 text-primary text-[10px] font-bold flex items-center gap-1 hover:underline cursor-pointer tracking-wider">
                  REGENERATE QUESTIONS <span className="material-symbols-outlined text-sm">refresh</span>
                </button>
              </div>

              {/* Modal Footer */}
              <div className="bg-white/5 border-t border-white/10 flex justify-end gap-4 pt-6 -mx-8 -mb-8 px-8">
                <button 
                  type="button"
                  className="px-6 py-3 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-all font-semibold text-sm cursor-pointer" 
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 transition-all text-sm cursor-pointer"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Interviews;
