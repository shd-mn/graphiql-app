'use client';

import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/firebase';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { routes } from '@/constants/routes';
import LanguageSwitcher from '../UI/LanguageSwitcher';

function Header() {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const t = useTranslations('Header');
  const tToast = useTranslations('ToastMessages');

  const onLogout = async () => {
    try {
      await logout();
      toast.info(tToast('auth.signOutSuccess'));
      router.push(routes.home);
    } catch (error) {
      toast.info(tToast('auth.errorSignOut'));
    }
  };

  return (
    <header className="padding-x z-50 flex h-14 items-center justify-between bg-blue-600 text-white">
      <div>
        <Link href={routes.home}>{t('home')}</Link>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        {!user ? (
          <>
            <Link href={routes.signin}>{t('signIn')}</Link>
            <Link href={routes.signup}>{t('signUp')}</Link>
          </>
        ) : (
          <div>
            <Button color="inherit" onClick={onLogout}>
              {t('signOut')}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
