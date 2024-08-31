'use client';

import React, { useState } from 'react';
import { Button, Tab, Tabs, TextField } from '@mui/material';
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

  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState<null | { error: string }>(null);

  const executeQuery = async () => {
    console.log(response);
    try {
      const reqQuery = query.slice(5);
      const res = await fetch('https://recipes-back-8dgq.onrender.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: null,
          query: reqQuery,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to fetch data' });
    }
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
        <CodeMirror width="100%" theme={vscodeDark} value={query} onChange={(value) => setQuery(value)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GraphiqlHeader></GraphiqlHeader>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CodeMirror width="100%" theme={vscodeDark} value={variables} onChange={(value) => setVariables(value)} />
      </CustomTabPanel>
      <Button onClick={() => executeQuery()}>Send</Button>
    </section>
  );
};

export default GraphiQLClient;
