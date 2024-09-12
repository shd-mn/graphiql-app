'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { selectAllMainState } from '@/redux/features/mainSlice';
import EmptyState from './EmptyState';
import ResponseBody from './ResponseBody';
import ResponseHeader from './ResponseHeader';
import Ellipsis from '@/components/Ellipsis';
import ErrorState from './ErrorState';

function ResponseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const {
    response: { data, success, statusText, status },
    isLoading,
  } = useAppSelector(selectAllMainState);

  if (isLoading) return <Ellipsis />;

  if (status === 0 && !data && !statusText) {
    return <EmptyState />;
  }

  if (!success && status === 0) {
    return <ErrorState />;
  }

  return (
    <Box component="section" className="padding-x flex h-full flex-col">
      <ResponseHeader activeTab={activeTab} handleTabChange={handleTabChange} />
      <ResponseBody activeTab={activeTab} />
    </Box>
  );
}

export default ResponseSection;
