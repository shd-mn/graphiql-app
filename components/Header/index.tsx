'use client';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { toastMessages } from '@/constants/toastMessages';
import { toast } from 'sonner';

function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const onLogout = async () => {
    try {
      await logout();
      toast.info(toastMessages.signOutSuccess);
      router.push(routes.home);
    } catch (error) {
      toast.error(toastMessages.errorSignOut);
    }
  };
  return (
    <header className="padding-x flex h-14 items-center justify-between bg-blue-600 text-white">
      <div>
        <Link href={routes.home}>Home</Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outlined" color="inherit">
          EN
        </Button>
        {!user ? (
          <>
            <Link href={routes.signin}>Sign In</Link>
            <Link href={routes.signup}>Sign Up</Link>
          </>
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
