import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import { DashboardLayout, LandingLayout, AuthLayout } from './components/Layouts';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ConversationPage from './pages/ConversationPage';
import ImagePage from './pages/ImagePage';
import VideoPage from './pages/VideoPage';
import MusicPage from './pages/MusicPage';
import CodePage from './pages/CodePage';
import SettingsPage from './pages/SettingsPage';

// Providers
import ToasterProvider from './components/ToasterProvider';

function App() {
  return (
    <>
      <ToasterProvider />
      <Routes>
        {/* Public Routes */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/conversation" element={<ConversationPage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/code" element={<CodePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
