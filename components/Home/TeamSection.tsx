import Image from 'next/image';
import Link from 'next/link';
import member from '@/public/assets/svg/illustration-hit-send.svg';
import { Box, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

function TeamSection() {
  const t = useTranslations('TeamSection');

  return (
    <Box component="section" className="mb-32">
      <Container maxWidth="sm">
        <header className="mb-5">
          <h2 className="text-center text-xl font-bold uppercase sm:text-2xl">{t('title')}</h2>
        </header>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-24 gap-y-8">
          <div className="flex flex-col items-center">
            <div className="mb-3 h-40 w-40">
              <Image
                src={member}
                width={160}
                height={160}
                alt="Shadman Alizada"
                className="aspect-square h-full w-full object-cover"
                priority
              />
            </div>

            <Link
              href="https://github.com/shd-mn"
              target="_blank"
              className="text-xl font-medium text-blue-400 hover:text-blue-500"
            >
              Shadman Alizada
            </Link>
            <span className="font-medium uppercase">{t('teamLead')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-3 h-40 w-40">
              <Image
                src={member}
                width={160}
                height={160}
                alt="Volha Melayok"
                className="aspect-square h-full w-full object-cover"
                priority
              />
            </div>

            <Link
              href="https://github.com/olitera"
              target="_blank"
              className="text-xl font-medium text-blue-400 hover:text-blue-500"
            >
              Volha Melayok
            </Link>
            <span className="font-medium uppercase">{t('developer')}</span>
          </div>
        </div>
      </Container>
    </Box>
  );
}
export default TeamSection;
