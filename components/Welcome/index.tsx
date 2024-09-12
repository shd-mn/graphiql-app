'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { routes } from '@/constants/routes';
import Link from 'next/link';

const Welcome = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div>
        {!user ? (
          <div>
            <h2 className="text-center">Welcome!</h2>
            <div className="flex gap-2">
              <Link href={routes.signin} className="text-blue-500 hover:text-blue-700">
                Sign In
              </Link>
              <Link href={routes.signup} className="text-blue-500 hover:text-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Welcome Back, {user.displayName}!</h2>
            <div className="flex gap-2">
              <Link href={routes.restful} className="text-blue-500 hover:text-blue-700">
                REST Client
              </Link>
              <Link href={routes.graphql} className="text-blue-500 hover:text-blue-700">
                GraphiQL Client
              </Link>
              <Link href={routes.history} className="text-blue-500 hover:text-blue-700">
                History
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
