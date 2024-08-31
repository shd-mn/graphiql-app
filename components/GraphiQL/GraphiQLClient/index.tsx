'use client';

import React from 'react';
import { Tab, Tabs, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '@/components/RestClient/Form/CustomTabPanel';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode/cjs/dark';
import GraphiqlHeader from '@/components/GraphiQL/GraphiQLClient/GraphiqlHeader';

const GraphiQLClient = () => {
  function a11yProps(index: number) {
    return {
      id: `qraphql-tab-${index}`,
      'aria-controls': `qraphql-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <section className="p-3">
      <div className="flex flex-col gap-2">
        <TextField id="outlined-basic" label="Endpoint" variant="outlined" />
        <TextField id="outlined-basic" label="SDL" variant="outlined" />
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Query" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
          <Tab label="Variables" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CodeMirror width="100%" theme={vscodeDark} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GraphiqlHeader></GraphiqlHeader>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CodeMirror width="100%" theme={vscodeDark} />
      </CustomTabPanel>
    </section>
  );
};

export default GraphiQLClient;
