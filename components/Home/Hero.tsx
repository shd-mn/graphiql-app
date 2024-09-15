import { Box, Container } from '@mui/material';
import Link from 'next/link';
import UserNavigationPanel from './UserNavigationPanel';
import { useTranslations } from 'next-intl';

function Hero() {
  const t = useTranslations('HomePage');

  return (
    <Box component="section" className="mb-20 mt-16">
      <Container maxWidth="xl">
        <header className="mb-16">
          <h1 className="mb-1 text-center text-3xl font-bold uppercase text-blue-500 sm:text-2xl">{t('title')}</h1>
          <h5 className="text-center text-sm font-medium uppercase">{t('subtitle')}</h5>
        </header>
        <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
          <p className="text-center font-medium">
            {t('description')}
            <Link href="https://rs.school/" target="_blank" className="text-blue-400 hover:text-blue-500">
              {t('rsSchoolLink')}
            </Link>
          </p>

          <UserNavigationPanel />
        </div>
      </Container>
    </Box>
  );
}

export default Hero;
