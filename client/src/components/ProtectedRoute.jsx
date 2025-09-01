import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If token exists, allow access to the nested routes (e.g., dashboard)
  // Otherwise, redirect to the sign-in page
  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
