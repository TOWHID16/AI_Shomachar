import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Layout for the main dashboard (protected routes)
export const DashboardLayout = () => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        <Outlet /> {/* This will render the nested route component, e.g., DashboardPage */}
      </main>
    </div>
  );
};

// Layout for the landing page
export const LandingLayout = () => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <Outlet /> {/* This will render LandingPage */}
      </div>
    </main>
  );
};

// Layout for the sign-in/sign-up pages
export const AuthLayout = () => {
  return (
    <main className="h-full bg-[#111827] flex items-center justify-center">
      <Outlet /> {/* This will render AuthPage */}
    </main>
  );
};
