import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import failedFetch from '@/public/assets/images/failed-fetch.webp';
import { useAppSelector } from '@/redux/hooks';
import { selectResponse } from '@/redux/features/mainSlice';
import { useTranslations } from 'next-intl';

function ErrorState() {
  const t = useTranslations('Response');
  const { statusText } = useAppSelector(selectResponse);

  return (
    <Box component="section" className="flex h-full flex-col px-3 sm:px-4 md:px-8 lg:px-12">
      <Typography variant="caption" component="h5" className="bg-transparent py-2 text-sm font-medium">
        {t('response')}
      </Typography>
      <Box component="div" className="flex h-full flex-col items-center justify-center">
        <Box component="div" className="flex flex-col items-center overflow-hidden">
          <Image
            src={failedFetch}
            alt={t('couldNotSendRequest')}
            width={140}
            height={140}
            className="mb-3 h-auto w-auto object-contain"
            priority
          />
          <Typography variant="caption" component="p" className="mb-2 text-center text-sm">
            {t('couldNotSendRequest')}
          </Typography>

          <Typography
            variant="body1"
            component="p"
            className="rounded-full bg-red-500 px-2 py-1 text-center text-sm font-medium text-white"
          >
            {statusText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default ErrorState;
