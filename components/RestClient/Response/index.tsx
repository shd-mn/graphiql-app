'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { selectResponse } from '@/redux/features/mainSlice';
import EmptyState from './EmptyState';
import ResponseBody from './ResponseBody';
import ResponseHeader from './ResponseHeader';

function ResponseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const { data } = useAppSelector(selectResponse);

  return (
    <Box component="section" className="h-full flex-1 px-3">
      {data ? (
        <>
          <ResponseHeader activeTab={activeTab} handleTabChange={handleTabChange} />
          <ResponseBody activeTab={activeTab} />
        </>
      ) : (
        <EmptyState />
      )}
    </Box>
  );
}
export default ResponseSection;
