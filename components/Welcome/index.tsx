'use client';

import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@mui/material';

const Welcome = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div>
      <div>
        {!user ? (
          <div>
            <h2 className="text-center">Welcome!</h2>
            <div className="flex gap-2">
              <Button href="/login" color="inherit" variant="outlined">
                Sign In
              </Button>
              <Button href="/signup" color="inherit" variant="outlined">
                Sign Up
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Welcome Back, {user.displayName}</h2>
            <div className="flex gap-2">
              <Button href="/rest" color="inherit" variant="outlined">
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
