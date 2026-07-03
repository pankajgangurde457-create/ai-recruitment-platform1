import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'executive';
  avatar_url?: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  action: string;
  target?: string;
  created_at: string;
  user: UserProfile;
}

export const AdminPanel: React.FC = () => {
  const { session, profile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!session) return;
      try {
        const response = await fetch('http://localhost:5000/api/admin/activities', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to retrieve administrator audits');
        }

        const data = await response.json();
        setUsers(data.users || []);
        setActivities(data.activities || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Access Forbidden');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [session]);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'recruiter' | 'executive') => {
    if (!session) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update user authorization role');
      }

      const updatedUser = await response.json();
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: updatedUser.role } : u));
      alert('User role updated successfully!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="glass-card p-8 rounded-2xl border border-red-500/20 text-center max-w-md mx-auto my-12">
        <span className="material-symbols-outlined text-red-400 text-5xl mb-4">gpp_bad</span>
        <h3 className="text-lg font-bold text-white mb-2">Access Denied</h3>
        <p className="text-sm text-red-400">
          This panel is restricted to system administrators. Please contact your administrator for credentials.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#e2e2e9]">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Loading Admin audits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#e2e2e9]">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Security & Audit logs</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage recruiter permissions and monitor system audit activities.</p>
      </header>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Users table */}
        <section className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Workspace Administrators & Recruiters</h3>
            <div className="space-y-4">
              {users.map(u => (
                <div key={u.id} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-white">{u.name}</h4>
                    <p className="text-xs text-on-surface-variant">{u.email}</p>
                  </div>

                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                    className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="recruiter">Recruiter</option>
                    <option value="executive">Executive</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right column: Audit logs */}
        <section className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Workspace Audit trail logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-on-surface-variant font-medium text-xs uppercase tracking-wider">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Action</th>
                    <th className="pb-3">Target</th>
                    <th className="pb-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activities.map(act => (
                    <tr key={act.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-white">{act.user?.name || 'System'}</td>
                      <td className="py-3 text-[#8a8b94]">{act.action}</td>
                      <td className="py-3 text-primary">{act.target || '-'}</td>
                      <td className="py-3 text-xs text-on-surface-variant font-mono-technical">
                        {new Date(act.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {activities.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-on-surface-variant">No activity logs recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AdminPanel;
