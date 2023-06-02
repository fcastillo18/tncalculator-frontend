import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { isUserSessionActive } from './auth';
import { User } from '../types/UserTypes';
import { ERole, SIGNED_USER } from '../types/Constants';

type AuthContextType = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  signedInUser: User | null;
  setSignedInUser: (user: User | null) => void;
  isUserAdmin: boolean;
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
  isUserAdmin: false,
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userRoles = user?.roles;
  const isAdmin = userRoles?.some((role) => role.name === ERole.ADMIN);

  useEffect(() => {
    // Get the login state from local storage
    if (isUserSessionActive()) {
      setIsUserLoggedIn(true);
      const userStorage = localStorage.getItem(SIGNED_USER);
      if (userStorage !== null) {
        setUser(JSON.parse(userStorage));
      }
    }
  }, []);

  const authContextValue: AuthContextType = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    signedInUser: user,
    setSignedInUser: setUser,
    isUserAdmin: isAdmin ?? false,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
