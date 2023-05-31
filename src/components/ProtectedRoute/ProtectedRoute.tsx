import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

enum ERole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

interface ProtectedProps {
  isSignedIn: boolean;
  children: ReactNode;
  path: string;
  isAdmin?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({
  isSignedIn,
  children,
  path,
  isAdmin = false,
}) => {
  let navigateTo = '/';
  // evaluate different routes to change the redirect path
  if (isSignedIn) {
    if (isAdmin) {
      // Only allow access to users with the "ADMIN" role
      if (path.includes('/user')) {
        navigateTo = '/not-found';
      } else {
        navigateTo = '/'; // Redirect to a different path if the user doesn't have the required role
      }
    } else {
      // No specific role required, allow access to all signed-in users
      navigateTo = '/dashboard';
    }
  }

  if (!isSignedIn) {
    return <Navigate to={navigateTo} replace />;
  }

  return <>{children}</>;
};

export default Protected;
