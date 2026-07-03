import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { TalentPipeline } from './pages/TalentPipeline';
import { AISourcing } from './pages/AISourcing';
import { Interviews } from './pages/Interviews';
import { JobBoard } from './pages/JobBoard';
import { Analytics } from './pages/Analytics';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { CandidateProfile } from './pages/CandidateProfile';
import { AdminPanel } from './pages/AdminPanel';
import { NotFound } from './pages/NotFound';
import { AuthCallback } from './pages/AuthCallback';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Dashboard protected routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/executive" element={<ExecutiveDashboard />} />
            <Route path="/pipeline" element={<TalentPipeline />} />
            <Route path="/candidate/:id" element={<CandidateProfile />} />
            <Route path="/sourcing" element={<AISourcing />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* Catch-all 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
