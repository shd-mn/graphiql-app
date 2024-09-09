'use client';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';
import Elipsis from '../Ellipsis';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicRoutes = [routes.home, routes.login, routes.signup];

    if (!loading) {
      if (!user && !publicRoutes.includes(pathname)) {
        router.push(routes.login);
      } else if (user && publicRoutes.includes(pathname)) {
        router.push(routes.home);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading || (!user && pathname !== routes.home && pathname !== routes.login && pathname !== routes.signup)) {
    return (
      <div className="flex h-[calc(100vh-6rem)] w-screen items-center justify-center">
        <Elipsis />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
