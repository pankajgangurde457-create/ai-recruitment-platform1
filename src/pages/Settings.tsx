import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [companyName, setCompanyName] = useState('HireFlow Global AI');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [website, setWebsite] = useState('https://hireflow-global.ai');
  
  // Toggle states
  const [hiredAlerts, setHiredAlerts] = useState(true);
  const [aiReports, setAiReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  // Team states
  const [team, setTeam] = useState([
    { name: 'Sarah Miller', email: 'sarah.m@hireflow.ai', role: 'Admin', status: 'ACTIVE', initials: 'SM' },
    { name: 'James Wilson', email: 'j.wilson@hireflow.ai', role: 'Recruiter', status: 'PENDING', initials: 'JW' },
  ]);
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isSaved, setIsSaved] = useState(false);

  const saveGeminiKey = () => {
    localStorage.setItem('gemini_api_key', geminiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleRoleChange = (idx: number, newRole: string) => {
    const updated = [...team];
    updated[idx].role = newRole;
    setTeam(updated);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)] relative z-10">
      
      {/* Settings Sub-Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="glass-pane p-4 space-y-2 bg-surface-container/20">
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary-container/20 text-primary border border-primary/20 transition-all shadow-[0_0_10px_rgba(100,138,255,0.1)] text-sm font-semibold" href="#">
            <span className="material-symbols-outlined text-xl">business</span>
            <span>Organization</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">group</span>
            <span>Team</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">badge</span>
            <span>Roles</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">notifications_active</span>
            <span>Notifications</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">security</span>
            <span>Security</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">payments</span>
            <span>Billing</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">hub</span>
            <span>Integrations</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">palette</span>
            <span>Appearance</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/5 transition-all text-sm" href="#">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
            <span>AI Config</span>
          </a>
        </div>
      </aside>

      {/* Main Settings Panel */}
      <div className="flex-1 space-y-12 pb-24 max-w-4xl">
        {/* Organization Settings */}
        <section className="space-y-6">
          <div>
            <h1 className="text-display-lg text-3xl font-display-lg font-bold text-on-surface mb-2">Organization Settings</h1>
            <p className="text-on-surface-variant text-sm">Manage your company's global profile, branding, and team environment.</p>
          </div>

          <div className="glass-pane p-8 space-y-8 bg-surface-container/20">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-20px bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-white/20">add_a_photo</span>
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-lg text-on-primary shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-sm font-bold">edit</span>
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Company Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-on-surface" 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Industry</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:border-primary outline-none text-on-surface cursor-pointer"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option>Technology &amp; SaaS</option>
                    <option>Fintech</option>
                    <option>Healthcare</option>
                    <option>Creative Services</option>
                  </select>
                </div>
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Company Website</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-all text-on-surface" 
                    type="text" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-headline-md text-xl font-headline-md font-bold text-on-surface">Team Members</h2>
              <p className="text-sm text-on-surface-variant">Control access and permissions for your recruitment team.</p>
            </div>
            <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm">
              <span className="material-symbols-outlined text-lg">person_add</span>
              Invite Member
            </button>
          </div>

          <div className="glass-pane overflow-hidden bg-surface-container/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {team.map((member, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                            member.status === 'ACTIVE' ? 'bg-tertiary-container' : 'bg-secondary-container'
                          }`}>
                            {member.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{member.name}</p>
                            <p className="text-xs text-on-surface-variant">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className="bg-transparent border-none text-sm text-primary p-0 focus:ring-0 cursor-pointer font-semibold outline-none"
                          value={member.role}
                          onChange={(e) => handleRoleChange(idx, e.target.value)}
                        >
                          <option className="bg-surface-container text-on-surface">Admin</option>
                          <option className="bg-surface-container text-on-surface">Recruiter</option>
                          <option className="bg-surface-container text-on-surface">Viewer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          member.status === 'ACTIVE' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grid Preference Config */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Notification Preferences */}
          <section className="glass-pane p-6 space-y-6 bg-surface-container/20">
            <h3 className="font-bold flex items-center gap-2 text-on-surface text-base">
              <span className="material-symbols-outlined text-primary">notifications</span>
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Candidate Hired Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={hiredAlerts}
                    onChange={() => setHiredAlerts(!hiredAlerts)}
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">AI Insight Reports</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={aiReports}
                    onChange={() => setAiReports(!aiReports)}
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">System Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={systemUpdates}
                    onChange={() => setSystemUpdates(!systemUpdates)}
                  />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* API Keys */}
          <section className="glass-pane p-6 space-y-6 bg-surface-container/20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-on-surface text-base">
                <span className="material-symbols-outlined text-primary">key</span>
                API Keys
              </h3>
              <button className="text-xs font-bold text-primary hover:underline cursor-pointer">Revoke All</button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                <p className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Production Key</p>
                <div className="flex items-center justify-between">
                  <code className="text-mono-technical font-mono text-primary text-xs">hf_live_••••••••••••••••34j2</code>
                  <button className="material-symbols-outlined text-sm text-on-surface-variant hover:text-white cursor-pointer">content_copy</button>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                <p className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Testing Key</p>
                <div className="flex items-center justify-between">
                  <code className="text-mono-technical font-mono text-on-surface-variant text-xs">hf_test_••••••••••••••••89x1</code>
                  <button className="material-symbols-outlined text-sm text-on-surface-variant hover:text-white cursor-pointer">content_copy</button>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Google Gemini API Key</p>
                  {isSaved && <span className="text-[10px] text-emerald-400 font-bold">Saved!</span>}
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter VITE_GEMINI_API_KEY..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                  <button 
                    type="button"
                    onClick={saveGeminiKey}
                    className="px-3 py-1.5 bg-primary hover:brightness-110 text-on-primary text-xs font-bold rounded transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
export default Settings;
