import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import hitSend from '@/public/assets/svg/illustration-hit-send.svg';

function EmptyState() {
  return (
    <Box component="section" className="flex h-full flex-col px-3 sm:px-4 md:px-8 lg:px-12">
      <Typography variant="caption" component="h5" className="bg-transparent py-2 text-sm font-medium">
        Response
      </Typography>
      <Box component="div" className="flex h-full flex-col items-center justify-center">
        <Box component="div" className="overflow-hidden">
          <Image
            src={hitSend}
            alt="hit send response"
            width={140}
            height={140}
            className="mb-3 h-auto w-full object-contain"
            priority
          />
          <Typography variant="caption" component="p" className="text-center text-sm">
            Click To Send a response
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default EmptyState;
