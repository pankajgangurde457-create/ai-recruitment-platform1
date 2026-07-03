import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  read: boolean;
  created_at: string;
}

export const Notifications: React.FC = () => {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const fetchNotifications = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${API_URL}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve notifications');
      }
      const data = await response.json();
      setNotifications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [session]);

  const handleMarkAllAsRead = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update notifications');
      }
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    if (!session) return;
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update notification');
      }
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Retrieving Alerts feed...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-[#e2e2e9]">
      <header className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Notifications</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage system matching evaluations and calendar scheduling warnings.</p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-xs font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs">checklist</span>
          <span>Mark all as read</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-2 text-xs">
        <button 
          onClick={() => setActiveTab('all')}
          className={`pb-2 font-bold transition-all cursor-pointer uppercase tracking-wider ${
            activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-white'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('unread')}
          className={`pb-2 font-bold transition-all cursor-pointer uppercase tracking-wider ${
            activeTab === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-white'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredNotifications.map((notif) => (
          <div 
            key={notif.id}
            onClick={() => !notif.read && handleMarkAsRead(notif.id)}
            className={`p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 cursor-pointer hover:border-white/20 transition-all ${
              !notif.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
            }`}
          >
            <div>
              <p className="text-sm text-white font-medium">{notif.message}</p>
              <p className="text-[10px] text-on-surface-variant font-mono-technical mt-1">
                {new Date(notif.created_at).toLocaleString()}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full ${!notif.read ? 'bg-primary' : 'border border-white/25'}`}></span>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <p className="text-center text-sm text-on-surface-variant py-12">No notifications found in this list.</p>
        )}
      </div>
    </div>
  );
};
export default Notifications;
