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
    if (!isAdmin && path.includes('/user')) {
      // Only allow access to users with the "ADMIN" role
      navigateTo = '/not-found';
    }
  }

  if (!isSignedIn) {
    return <Navigate to={navigateTo} replace />;
  }

  return <>{children}</>;
};

export default Protected;
