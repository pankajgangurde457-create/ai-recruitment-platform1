import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    ...(profile?.role === 'executive' ? [{ path: '/executive', label: 'Executive View', icon: 'leaderboard' }] : []),
    { path: '/pipeline', label: 'Talent Pipeline', icon: 'groups' },
    { path: '/sourcing', label: 'AI Sourcing', icon: 'psychology' },
    { path: '/interviews', label: 'Interviews', icon: 'event_available' },
    { path: '/jobs', label: 'Job Board', icon: 'work' },
    { path: '/analytics', label: 'Analytics', icon: 'insights' },
    { path: '/notifications', label: 'Notifications', icon: 'notifications' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
    ...(profile?.role === 'admin' ? [{ path: '/admin', label: 'Admin Panel', icon: 'admin_panel_settings' }] : []),
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#e2e2e9] relative flex">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-72 left-0 top-0 fixed border-r border-white/10 bg-surface-container/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col py-8 z-50">
        <div className="px-8 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-white leading-tight">HireFlow AI</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Elite Recruitment</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 transition-all duration-300 rounded-xl ${
                  isActive
                    ? 'text-primary bg-primary/10 border-r-4 border-primary shadow-[0_0_15px_rgba(181,196,255,0.2)]'
                    : 'text-[#8a8b94] hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-auto space-y-4">
          <button 
            onClick={() => navigate('/sourcing')}
            className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
            New Search
          </button>
          <div className="pt-4 border-t border-white/5">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/settings'); }} className="flex items-center gap-4 px-6 py-3 text-[#8a8b94] hover:text-white transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
              <span>Support</span>
            </a>
            <a href="#" onClick={handleLogout} className="flex items-center gap-4 px-6 py-3 text-[#8a8b94] hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Top Header Navigation */}
      <header className="fixed top-0 right-0 w-[calc(100%-288px)] h-16 bg-[#0c0d12]/50 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-8 z-40">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all text-white"
              placeholder="Search talent, roles, or insights..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 ml-8">
          <button onClick={() => navigate('/notifications')} className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{profile?.name || 'Recruiter'}</p>
              <p className="text-[10px] text-on-surface-variant font-mono-technical font-semibold uppercase tracking-wider">
                {profile?.role || 'recruiter'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
              <div className="w-full h-full rounded-full bg-surface-dim flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Profile"
                  src={profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCgCC0ytT5C8D2CDfPfIotornXtwY3a7CmC6rCWz9psAcLdrGS9x27MLOcQFsRjL5nbecfVDozSi8BkUsAaViacJs0V6yspgy2deQ0uGtynzzN9WTXh9ciU3vg8YCJN9mzM6BXJSz2lDAACAph0hhM9x8XDe7RE36Ch4gTt7KX1ZgjjauikAWOI3WfOH4lhEiKFdr9JAG6b4HBjtcpm0urbHMF-tjhmWYSggAc0_ITR3FHTYyyvI0q9BJq_XEexSboYVsyC1lZ43XB'}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 pt-16 min-h-screen relative flex flex-col">
        {/* Animated Background Decoration */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full"></div>
        </div>

        {/* Dynamic route contents */}
        <div className="flex-1 relative z-10 p-8 max-w-container-max mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default DashboardLayout;
