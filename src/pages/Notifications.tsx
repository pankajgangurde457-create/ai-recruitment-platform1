import React, { useState } from 'react';

interface NotificationItem {
  id: string;
  type: 'ai' | 'apply' | 'calendar' | 'offer';
  title: string;
  time: string;
  desc: string;
  unread: boolean;
  isAiGlow?: boolean;
  ctaText?: string;
  hasShimmer?: boolean;
}

export const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions' | 'system'>('all');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'ai',
      title: 'AI Recommendation Found',
      time: '2m ago',
      desc: 'Our AI agent discovered a 98% match for the Senior Product Designer role. The candidate has previous experience at Stripe and Airbnb.',
      unread: true,
      isAiGlow: true,
      ctaText: 'View Candidate',
    },
    {
      id: '2',
      type: 'apply',
      title: 'New Candidate Applied',
      time: '45m ago',
      desc: 'Jordan Smith applied for the Full Stack Engineer (Remote) position. Portfolio link verified by AI screening.',
      unread: true,
      ctaText: 'Review CV',
    },
    {
      id: '3',
      type: 'calendar',
      title: 'Interview Scheduled',
      time: '3h ago',
      desc: 'Technical interview confirmed with Sarah Chen for tomorrow at 10:00 AM PST. Calendar invites sent.',
      unread: false,
      ctaText: 'View Details',
    },
    {
      id: '4',
      type: 'offer',
      title: 'Offer Accepted',
      time: 'Yesterday',
      desc: 'Exciting news! Marcus Wright has accepted the offer for Head of Engineering. Onboarding sequence initiated.',
      unread: false,
      hasShimmer: true,
      ctaText: 'Start Onboarding',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, unread: false }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'mentions') return n.type === 'apply' || n.type === 'ai';
    if (activeTab === 'system') return n.type === 'calendar';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Notifications</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage your AI-powered recruitment insights and system alerts.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 text-on-surface font-semibold hover:bg-white/5 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <span className="material-symbols-outlined text-sm">checklist</span>
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-8 mb-6 border-b border-white/5 text-sm">
        <button 
          onClick={() => setActiveTab('all')}
          className={`pb-4 font-bold transition-all cursor-pointer ${
            activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('unread')}
          className={`pb-4 font-bold transition-all cursor-pointer ${
            activeTab === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Unread
        </button>
        <button 
          onClick={() => setActiveTab('mentions')}
          className={`pb-4 font-bold transition-all cursor-pointer ${
            activeTab === 'mentions' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Mentions
        </button>
        <button 
          onClick={() => setActiveTab('system')}
          className={`pb-4 font-bold transition-all cursor-pointer ${
            activeTab === 'system' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          System
        </button>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredNotifications.length === 0 ? (
          <div className="glass-pane p-12 text-center text-on-surface-variant text-sm border-white/5">
            No notifications in this folder.
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const IconEl = () => {
              if (notif.type === 'ai') {
                return (
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(181,196,255,0.2)]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                );
              }
              if (notif.type === 'apply') {
                return (
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">person_add</span>
                  </div>
                );
              }
              if (notif.type === 'calendar') {
                return (
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                );
              }
              // offer
              return (
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              );
            };

            return (
              <div 
                key={notif.id}
                className={`rounded-xl p-6 flex flex-col md:flex-row gap-6 group relative overflow-hidden transition-all duration-300 ${
                  notif.isAiGlow 
                    ? 'ai-glow-border' 
                    : 'glass-pane hover:bg-white/[0.03]'
                }`}
              >
                {notif.hasShimmer && (
                  <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
                )}
                
                <div className="flex-shrink-0 z-10">
                  <IconEl />
                </div>
                
                <div className="flex-grow space-y-1 z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-body-base font-bold text-on-surface">{notif.title}</h3>
                    <span className="text-mono-technical text-on-surface-variant text-[11px] font-mono">{notif.time}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{notif.desc}</p>
                  
                  <div className="flex items-center gap-4 pt-4">
                    {notif.ctaText && (
                      <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer ${
                        notif.type === 'ai' 
                          ? 'bg-primary text-on-primary' 
                          : notif.type === 'offer' 
                            ? 'bg-tertiary text-on-tertiary'
                            : 'bg-white/5 border border-white/10 text-on-surface hover:bg-white/10'
                      }`}>
                        {notif.ctaText}
                      </button>
                    )}
                    <button 
                      onClick={() => dismissNotification(notif.id)}
                      className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-on-surface hover:text-red-400 text-xs font-bold transition-all cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center z-10 pl-4">
                  {notif.unread ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(181,196,255,0.5)]"></div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-white/20"></div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Bottom Floating AI Summary Widget */}
        <div className="mt-8 glass-pane rounded-2xl p-8 border-l-4 border-primary relative overflow-hidden bg-surface-container/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 flex-shrink-0 rounded-full glass-pane p-1 relative bg-black/30 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 rounded-full ai-glow-border opacity-50"></div>
              <img 
                className="w-full h-full rounded-full object-cover" 
                alt="AI Notification Summary" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhJthN43dKYStutM-7gFfkayhYsrOPZsDxBZHIaVzFKmRbS_UWbRwqrLyw1xDZmMPRkVw53KOO7Vhjude2pJHqlntwdzFz9jf22gUcM2edNAdrAKFLSAloUtd7xAtGYA0YCS6E9ZIi0Y6Z1BLyVSgTl_jqz1rpu9aRF0q7duZPPRjfn_anN8fkPDK4OjWHhlnzpeHZTKbZ7vScvcXY1H9d5U9a5zkG2LLsnUqakHCOJn1K034I2VapsLMoJGnMWac_rQQZBmNkH5vd"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="font-headline-md text-on-surface mb-2 font-bold text-lg">AI Notification Summary</h4>
              <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                You have 12 new updates today. Based on your activity patterns, the application for <strong>Senior Product Designer</strong> is your highest priority. AI recommends reviewing this candidate within the next hour.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold border border-white/10 transition-all cursor-pointer text-sm">
                Optimize My Day
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notifications;
