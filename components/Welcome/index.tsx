'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from '@/i18n/routing';
import { routes } from '@/constants/routes';
import { useTranslations } from 'next-intl';

const Welcome = () => {
  const [user] = useAuthState(auth);
  const t = useTranslations('HomePage');
  return (
    <div>
      <div>
        {!user ? (
          <div>
            <h2 className="text-center">{t('title')}</h2>
            <div className="flex gap-2">
              <Link href={routes.signin} className="text-blue-500 hover:text-blue-700">
                {t('signIn')}
              </Link>
              <Link href={routes.signup} className="text-blue-500 hover:text-blue-700">
                {t('signUp')}
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">{t('welcomeBack', { name: user.displayName })}</h2>
            <div className="flex gap-2">
              <Link href={routes.restful} className="text-blue-500 hover:text-blue-700">
                {t('restClient')}
              </Link>
              <Link href={routes.graphql} className="text-blue-500 hover:text-blue-700">
                {t('graphiqlClient')}
              </Link>
              <Link href={routes.history} className="text-blue-500 hover:text-blue-700">
                {t('history')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
