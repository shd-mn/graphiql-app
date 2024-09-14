'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from '@/i18n/routing';
import { routes } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import { Box, Button } from '@mui/material';
const UserNavigationPanel = () => {
  const [user] = useAuthState(auth);
  const t = useTranslations('HomePage');
  return (
    <Box>
      {!user ? (
        <Box className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-xl font-medium">{t('title')}</h2>
          <Box component="span" className="flex flex-wrap justify-center gap-2">
            <Button variant="contained">
              <Link href={routes.signin}>{t('signIn')}</Link>
            </Button>
            <Button variant="contained">
              <Link href={routes.signup}>{t('signUp')}</Link>
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-xl font-medium">{t('welcomeBack', { name: user.displayName })}</h2>

          <Box component="span" className="flex flex-wrap justify-center gap-2">
            <Button variant="contained">
              <Link href={routes.restful}>{t('restClient')}</Link>
            </Button>
            <Button variant="contained">
              <Link href={routes.graphql}>{t('graphiqlClient')}</Link>
            </Button>
            <Button variant="contained">
              <Link href={routes.history}>{t('history')}</Link>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserNavigationPanel;
