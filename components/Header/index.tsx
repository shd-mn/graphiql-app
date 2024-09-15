'use client';

import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/firebase';
import { toast } from 'sonner';
import { routes } from '@/constants/routes';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import { useState } from 'react';

function Header() {
  const [user] = useAuthState(auth);
  const [isSticky, setIsSticky] = useState(false);

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

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <header
      className={`padding-x sticky inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-blue-600 text-white ${isSticky ? 'bg-gray-500' : ''}`}
    >
      <div>
        <Link href={routes.home} className="custom-button">
          {t('home')}
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {!user ? (
          <>
            <Link href={routes.signin} className="custom-button">
              {t('signIn')}
            </Link>
            <Link href={routes.signup} className="custom-button">
              {t('signUp')}
            </Link>
          </>
        ) : (
          <div>
            <span color="inherit" onClick={onLogout} className="custom-button cursor-pointer">
              {t('signOut')}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
