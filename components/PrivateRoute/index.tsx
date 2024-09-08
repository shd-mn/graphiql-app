'use client';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !user &&
      !loading &&
      (pathname === routes.restfull || pathname == routes.graphql || pathname === routes.history)
    ) {
      router.push(routes.login);
    }

    if (user && !loading && (pathname === routes.signup || pathname === routes.login)) {
      router.push(routes.home);
    }
  }, [user, loading, pathname, router]);

  return loading ||
    (user && !loading && (pathname === routes.signup || pathname === routes.login)) ||
    (!user &&
      !loading &&
      (pathname === routes.restfull || pathname == routes.graphql || pathname === routes.history)) ? (
    <div className="flex h-screen w-screen items-center justify-center">
      <span>...loading</span>
    </div>
  ) : (
    <>{children}</>
  );
};

export default PrivateRoute;
