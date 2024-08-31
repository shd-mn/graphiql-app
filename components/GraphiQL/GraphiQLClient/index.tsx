'use client';

import React from 'react';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '@/components/RestClient/Form/CustomTabPanel';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode/cjs/dark';
import GraphiqlHeader from '@/components/GraphiQL/GraphiQLClient/GraphiqlHeader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAll, setQuery, setResponse, setUrl, setVariables } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useRouter } from 'next/navigation';

const GraphiQLClient = () => {
  function a11yProps(index: number) {
    return {
      id: `qraphql-tab-${index}`,
      'aria-controls': `qraphql-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();
  const { query, variables, url } = useAppSelector(selectAll);

  const executeQuery = async () => {
    try {
      const reqQuery = query.slice(5);
      const res = await fetch(url, {
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
      dispatch(setResponse(data));
      const a = Buffer.from(JSON.stringify(data.data), 'utf-8').toString('base64');
      const b = Buffer.from(a, 'base64').toString('utf-8');
      console.log(a, '!!!!', b);
      router.push(`/graphql/${a}`);
    } catch (error) {
      dispatch(setResponse('Failed to fetch data'));
    }
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };

  return (
    <section className="p-3">
      <div className="flex flex-col gap-2">
        <TextField id="outlined-basic" label="Endpoint" variant="outlined" value={url} onChange={changeUrl} />
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
        <CodeMirror width="100%" theme={vscodeDark} value={query} onChange={(value) => dispatch(setQuery(value))} />
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
      <Button onClick={() => executeQuery()}>Send</Button>
    </section>
  );
};

export default GraphiQLClient;
