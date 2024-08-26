'use client';

import Link from 'next/link';
import { routes } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const onLogout = async () => {
    try {
      await logout();
      router.push(routes.home);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="flex h-20 items-center justify-between bg-blue-600 text-white">
      <div>
        <Link href={routes.home}>Home</Link>
      </div>
      <div className="flex">
        <Button variant="outlined" color="inherit">
          EN
        </Button>
        {!user ? (
          <div>
            <Button href={routes.login} color="inherit">
              Sign In
            </Button>
            <Button href={routes.signup} color="inherit">
              Sign Up
            </Button>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
