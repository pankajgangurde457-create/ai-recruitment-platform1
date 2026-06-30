import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { Login } from './pages/Login';
import { PremiumLogin } from './pages/PremiumLogin';
import { Dashboard } from './pages/Dashboard';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { TalentPipeline } from './pages/TalentPipeline';
import { AISourcing } from './pages/AISourcing';
import { Interviews } from './pages/Interviews';
import { JobBoard } from './pages/JobBoard';
import { Analytics } from './pages/Analytics';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/premium-login" element={<PremiumLogin />} />

        {/* Dashboard layout routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/executive" element={<ExecutiveDashboard />} />
          <Route path="/pipeline" element={<TalentPipeline />} />
          <Route path="/sourcing" element={<AISourcing />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
