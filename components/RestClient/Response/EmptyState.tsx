import { Box, Typography } from '@mui/material';

function EmptyState() {
  return (
    <>
      <Box component="header" className="flex items-center justify-between py-1 text-sm">
        <Typography variant="caption" component="h5" className="text-sm font-medium">
          Response
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" component="h5">
          Click To Send a response
        </Typography>
      </Box>
    </>
  );
}
export default EmptyState;
