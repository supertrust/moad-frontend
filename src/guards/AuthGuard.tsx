import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Login from '../pages/login';
import useAuth from '@src/hooks/useAuth';
import { LoadingPage } from '@src/components/pages';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading, isUserLoading } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if(isUserLoading)return;
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation, isUserLoading]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated && !isUserLoading) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}
