import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@/constants/routes';
import Image from 'next/image';
import historyImg from '@/public/assets/svg/illustration-search.svg';

function EmptyHistory() {
  return (
    <Box component="section" className="padding-x flex h-full w-full items-center justify-center">
      <Box component="div" className="flex flex-col items-center text-center">
        <Box component="div" className="mb-6 w-full max-w-[200px]">
          <Image
            src={historyImg}
            alt="empty requests"
            width={200}
            height={200}
            priority
            className="aspect-square h-auto w-full object-contain"
          />
        </Box>

        <Typography variant="h3" component="h3" className="text-center text-lg font-medium">
          You haven&apos;t executed any requests
        </Typography>

        <Typography className="mb-3 text-center">It&apos;s empty here. Try:</Typography>

        <Box component="span" className="flex flex-wrap justify-center gap-2">
          <Button variant="contained">
            <Link href={routes.restful}>REST Client</Link>
          </Button>
          <Button variant="contained">
            <Link href={routes.graphql}>GraphiQL Client</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default EmptyHistory;
