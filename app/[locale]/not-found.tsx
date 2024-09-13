import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex h-screen flex-col items-center justify-center text-white">
      <h3>{t('title')}</h3>
      <Link href="/">{t('backToHome')}</Link>
    </div>
  );
}

export default NotFound;
