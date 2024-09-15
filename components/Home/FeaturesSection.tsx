import { Box, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

function FeaturesSection() {
  const t = useTranslations('FeaturesSection');

  return (
    <Box component="section" className="mb-20">
      <Container maxWidth="lg">
        <div className="flex flex-col gap-20">
          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature1')}</h3>
            <div className="h-full w-full overflow-hidden rounded-lg shadow-2xl">
              <video width="100%" height="100%" preload="auto" autoPlay loop>
                <source
                  src="https://res.cloudinary.com/dtgiq47xj/video/upload/v1726433444/rs-final/rest_t4oht0.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <div className="h-full w-full overflow-hidden rounded-lg shadow-2xl max-sm:order-2">
              <video width="100%" height="100%" preload="auto" autoPlay loop>
                <source
                  src="https://res.cloudinary.com/dtgiq47xj/video/upload/v1726433574/rs-final/graph_vznyaz.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature2')}</h3>
          </div>

          <div className="grid h-[350] items-center justify-center gap-12 sm:grid-cols-2">
            <h3 className="text-lg font-bold text-blue-500 max-sm:text-center sm:text-xl">{t('feature3')}</h3>
            <div className="h-full w-full overflow-hidden rounded-lg shadow-2xl">
              <video width="100%" height="100%" preload="auto" autoPlay loop>
                <source
                  src="https://res.cloudinary.com/dtgiq47xj/video/upload/v1726433591/rs-final/history_d4xgud.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
export default FeaturesSection;
