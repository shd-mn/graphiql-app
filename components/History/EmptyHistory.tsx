import { Link } from '@/i18n/routing';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@/constants/routes';
import Image from 'next/image';
import historyImg from '@/public/assets/svg/illustration-search.svg';
import { useTranslations } from 'next-intl';

function EmptyHistory() {
  const t = useTranslations('HistoryPage');

  return (
    <Box component="section" className="padding-x flex h-full w-full items-center justify-center">
      <Box component="div" className="flex flex-col items-center text-center">
        <Box component="div" className="mb-6 w-full max-w-[200px]">
          <Image
            src={historyImg}
            alt={t('emptyRequestsAlt')}
            width={200}
            height={200}
            priority
            className="aspect-square h-auto w-full object-contain"
          />
        </Box>

        <Typography variant="h3" component="h3" className="text-center text-lg font-medium">
          {t('noRequests')}
        </Typography>

        <Typography className="mb-3 text-center">{t('tryFollowing')}</Typography>

        <Box component="span" className="flex flex-wrap justify-center gap-2">
          <Button variant="contained">
            <Link href={routes.restful}>{t('restClient')}</Link>
          </Button>
          <Button variant="contained">
            <Link href={routes.graphql}>{t('graphiqlClient')}</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EmptyHistory;
