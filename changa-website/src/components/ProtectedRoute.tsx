import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean; // Whether the user is allowed to access the route
  redirectPath?: string; // Path to redirect to if not allowed (defaults to '/landing')
  children?: React.ReactNode; // The content or components to render if allowed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  // If not allowed, redirect to the specified redirectPath
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  // If allowed, render the children or Outlet (nested routes)
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
