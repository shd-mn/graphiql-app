'use client';

import React, { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '@/components/RestClient/Form/CustomTabPanel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAll, setQuery, setResponse } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useRouter } from 'next/navigation';
import { GraphiQLProvider, QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiqlHeader from '@/components/GraphiQLClient/GraphiqlHeader';
import Documentation from '@/components/GraphiQLClient/Documentation';
import PrettifyButton from '@/components/GraphiQLClient/PrettifyButton';
import VariablesSection from '@/components/GraphiQLClient/VariablesSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { routes } from '@/constants/routes';
import UrlForm from '@/components/GraphiQLClient/UrlForm';

const GraphiQLClient = () => {
  const { query, variables, url, headers } = useAppSelector(selectAll);
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
    const requestHeaders = Object.fromEntries(headers.map((header) => [header.key, header.value]).reverse());
    console.log(requestHeaders);

    const reqHeaders = headers
      ? requestHeaders
      : {
          'Content-Type': 'application/json',
        };

    try {
      const [queryType] = filteredQuery.match(/(query|mutation|subscription)/) || [''];
      const [_, operationName] = filteredQuery.match(/(?<=query|mutation|subscription)\s*([^\s{]+)\s*\{/) || [];
      const [reqQuery] = filteredQuery.match(/{[\s\S]*$/) || [''];
      const isVariablesProvidedInTheQuery = !!filteredQuery.match(
        /^\s*(mutation|query)\s*[a-zA-Z0-9_]*\s*\([^)]+\)\s*\{/,
      );

      const res = await fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          operationName,
          query: !operationName && queryType === 'query' && !isVariablesProvidedInTheQuery ? reqQuery : filteredQuery,
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

  const sendQuery = () => {
    executeQuery().then((data) => {
      const a = Buffer.from(JSON.stringify(data.data), 'utf-8').toString('base64');
      router.push(`${routes.graphql}/${a}`);
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
          <UrlForm />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Query" {...a11yProps(0)} />
              <Tab label="Headers" {...a11yProps(1)} />
              <Tab label="Documentation" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="h-96">
              <PrettifyButton />
              <QueryEditor onEdit={edit} />
            </div>
            <Accordion className="bg-gray-100 text-orange-600">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                VARIABLES
              </AccordionSummary>
              <AccordionDetails className="h-64">
                <VariablesSection />
              </AccordionDetails>
            </Accordion>
            <Button onClick={() => sendQuery()}>Send</Button>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <GraphiqlHeader></GraphiqlHeader>
          </CustomTabPanel>
          <CustomTabPanel index={2} value={value}>
            <Documentation></Documentation>
          </CustomTabPanel>
        </section>
      </div>
    </GraphiQLProvider>
  );
};

export default GraphiQLClient;
