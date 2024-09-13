'use client';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { usePathname, useRouter } from '@/i18n/routing';
import { routes } from '@/constants/routes';
import Elipsis from '../UI/Ellipsis';

const publicRoutes = [routes.home, routes.signin, routes.signup];

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !publicRoutes.includes(pathname)) {
        router.push(routes.signin);
      } else if (user && publicRoutes.includes(pathname)) {
        router.push(routes.home);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading || (!user && pathname !== routes.home && pathname !== routes.signin && pathname !== routes.signup)) {
    return (
      <div className="flex h-[calc(100vh-6rem)] w-screen items-center justify-center">
        <Elipsis />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
