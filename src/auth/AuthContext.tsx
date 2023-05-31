import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { JWT_TOKEN_NAME } from '../types/Constants';
import { isUserSessionActive } from './auth';

interface AuthContextProps {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAuthContext: AuthContextProps = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {
    false;
  },
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Get the login state from local storage
    if (isUserSessionActive()) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const authContextValue: AuthContextProps = {
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
