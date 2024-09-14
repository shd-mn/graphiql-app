import { Box, Container } from '@mui/material';
import Image from 'next/image';
import member from '@/public/assets/svg/illustration-hit-send.svg';
import { useTranslations } from 'next-intl';

function FeaturesSection() {
  const t = useTranslations('FeaturesSection');

  return (
    <Box component="section" className="mb-20">
      <Container maxWidth="lg">
        <div className="flex flex-col gap-10">
          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature1')}</h3>
            <div className="h-full w-full">
              <Image src={member} alt={t('feature1')} className="h-auto w-full" priority />
            </div>
          </div>

          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <div className="h-full w-full max-sm:order-2">
              <Image src={member} alt={t('feature2')} className="h-auto w-full" priority />
            </div>
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature2')}</h3>
          </div>

          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature3')}</h3>
            <div className="h-full w-full">
              <Image src={member} alt={t('feature3')} className="h-auto w-full" priority />
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
export default FeaturesSection;
