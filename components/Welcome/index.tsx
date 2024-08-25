'use client';

import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@mui/material';
import { routes } from '@/constants/routes';

const Welcome = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div>
        {!user ? (
          <div>
            <h2 className="text-center">Welcome!</h2>
            <div className="flex gap-2">
              <Button href={routes.login} color="inherit" variant="outlined">
                Sign In
              </Button>
              <Button href={routes.signup} color="inherit" variant="outlined">
                Sign Up
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Welcome Back, {user.displayName}!</h2>
            <div className="flex gap-2">
              <Button href={routes.restfull} color="inherit" variant="outlined">
                REST Client
              </Button>
              <Button color="inherit" variant="outlined">
                GraphiQL Client
              </Button>
              <Button color="inherit" variant="outlined">
                History
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
