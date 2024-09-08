import { selectResponse } from '@/redux/features/mainSlice';
import { useAppSelector } from '@/redux/hooks';
import { a11yProps } from '@/utils/a11yProps';
import { calcSize } from '@/utils/calcSize';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';

type PropTypes = {
  activeTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

function ResponseHeader({ activeTab, handleTabChange }: PropTypes) {
  const { data, parsedHeaders, status, statusText, responseTime } = useAppSelector(selectResponse);
  const size = calcSize(JSON.stringify(data), JSON.stringify(parsedHeaders));

  return (
    <Box component="header" className="flex items-center justify-between py-1 text-sm">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="restfull request tabs"
        TabIndicatorProps={{
          className: 'bg-orange-500 mb-0 h-[2px] bottom-2',
        }}
      >
        <Tab label="Body" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(0)} />
        <Tab label="Headers" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(1)} />
      </Tabs>

      <Box component="div" className="flex items-center justify-between gap-3">
        {/* TODO: Status Text Color */}
        <Typography
          variant="button"
          component="p"
          className={`rounded-sm px-2 py-[1px] ${status === 200 ? 'bg-green-700 text-green-200' : 'bg-red-700 text-red-200'}`}
        >
          {`${status} ${statusText}`}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography component="p" className="text-sm">{`${responseTime} ms`}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography component="p" className="text-sm">
          {size}
        </Typography>
      </Box>
    </Box>
  );
}
export default ResponseHeader;
