import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { isUserSessionActive } from './auth';
import { User } from '../types/UserTypes';

type AuthContextType = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  signedInUser: User | null;
  setSignedInUser: (user: User | null) => void;
};

const initialAuthContext: AuthContextType = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {
    false;
  },
  signedInUser: null,
  setSignedInUser: () => {
    null;
  },
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get the login state from local storage
    if (isUserSessionActive()) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const authContextValue: AuthContextType = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    signedInUser: user,
    setSignedInUser: setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
