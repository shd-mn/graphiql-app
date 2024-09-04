'use client';

import React, { useMemo } from 'react';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '@/components/RestClient/Form/CustomTabPanel';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode/cjs/dark';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectAll,
  setQuery,
  setResponse,
  setSdlUrl,
  setUrl,
  setVariables,
} from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useRouter } from 'next/navigation';
import { GraphiQLProvider, QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiqlHeader from '@/components/GraphiQLClient/GraphiqlHeader';
import Documentation from '@/components/GraphiQLClient/Documentation';
import PrettifyButton from '@/components/GraphiQLClient/PrettifyButton';

const GraphiQLClient = () => {
  const { query, variables, url, sdlUrl } = useAppSelector(selectAll);
  const fetcher = useMemo(() => createGraphiQLFetcher({ url }), [url]);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const executeQuery = async () => {
    const lines = query.split('\n');
    const filteredLines = lines.filter((line) => !line.trim().startsWith('#'));
    const filteredQuery = filteredLines.join('\n');
    try {
      const [queryType] = filteredQuery.match(/(query|mutation|subscription)/) || [''];

      const [operationName] = filteredQuery.match(/(?<=query|mutation|subscription)\s*([^\s{]+)\s*\{/) || [];
      const [reqQuery] = filteredQuery.match(/{[\s\S]*$/) || [''];
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName,
          query: !operationName && queryType === 'query' ? reqQuery : filteredQuery,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });
      const data = await res.json();
      dispatch(setResponse(data));
      return data;
    } catch (error) {
      dispatch(setResponse('Failed to fetch data'));
    }
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };

  const sendQuery = () => {
    executeQuery().then((data) => {
      const a = Buffer.from(JSON.stringify(data.data), 'utf-8').toString('base64');
      router.push(`/graphql/${a}`);
    });
  };

  function a11yProps(index: number) {
    return {
      id: `qraphql-tab-${index}`,
      'aria-controls': `qraphql-tabpanel-${index}`,
    };
  }

  function edit(value: string) {
    console.log(value);
    dispatch(setQuery(value));
  }

  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="graphiql-container">
        <section className="p-3">
          <div className="flex flex-col gap-2">
            <TextField id="outlined-basic" label="Endpoint" variant="outlined" value={url} onChange={changeUrl} />
            <TextField
              id="outlined-basic"
              label="SDL"
              variant="outlined"
              value={sdlUrl || url + '?sdl'}
              onChange={(e) => dispatch(setSdlUrl(e.target.value))}
            />
          </div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Query" {...a11yProps(0)} />
              <Tab label="Headers" {...a11yProps(1)} />
              <Tab label="Variables" {...a11yProps(2)} />
              <Tab label="Documentation" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="h-64">
              <PrettifyButton />
              <QueryEditor onEdit={edit} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <GraphiqlHeader></GraphiqlHeader>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CodeMirror
              width="100%"
              theme={vscodeDark}
              value={variables}
              onChange={(value) => dispatch(setVariables(value))}
            />
          </CustomTabPanel>
          <CustomTabPanel index={3} value={value}>
            <Documentation></Documentation>
          </CustomTabPanel>
          <Button onClick={() => sendQuery()}>Send</Button>
        </section>
      </div>
    </GraphiQLProvider>
  );
};

export default GraphiQLClient;
