import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useLogin, useRegister } from './auth-utils';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  register: () => Promise.reject(),
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useLogin(() => {
    setIsAuthenticated(true);
  });
  const register = useRegister();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout: () => setIsAuthenticated(false),
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
