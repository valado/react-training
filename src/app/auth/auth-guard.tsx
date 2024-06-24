import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context';
import { storeDeepLink } from './auth-utils';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    storeDeepLink(pathname);
  }

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export const withGuard = (children: JSX.Element) => (
  <AuthGuard>{children}</AuthGuard>
);
