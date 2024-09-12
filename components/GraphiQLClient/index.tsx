'use client';

import React, { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '../UI/CustomTabPanel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAll, setQuery, setUrl } from '@/redux/features/graphiqlSlice';
import { setResponse } from '@/redux/features/mainSlice';
import { useRouter } from 'next/navigation';
import { GraphiQLProvider, QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiqlHeader from '@/components/GraphiQLClient/GraphiqlHeader';
import Documentation from '@/components/GraphiQLClient/Documentation';
import PrettifyButton from '@/components/GraphiQLClient/PrettifyButton';
import VariablesSection from '@/components/GraphiQLClient/VariablesSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import { UrlGraphql } from '@/types/url-graphql.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { urlValidationSchema } from '@/validation/url-graphql.validation';
import UrlSection from '@/components/GraphiQLClient/UrlSection';
import { toast } from 'sonner';
import { toastMessages } from '@/constants/toastMessages';
import { fetcher } from '@/services/response';
import { a11yProps } from '@/utils/a11yProps';
import { getFilteredQuery } from '@/utils/getiFlteredQuery';
import { setBrowserUrl } from '@/utils/setBrowserUrl';

interface GraphiQLClientProps {
  queryinput?: string;
  headersinput: Record<string, string>;
  urlinput?: string;
}

const GraphiQLClient = ({ queryinput, headersinput, urlinput }: GraphiQLClientProps) => {
  const { query, variables, url, headers } = useAppSelector(selectAll);
  const gqlFetcher = useMemo(() => createGraphiQLFetcher({ url }), [url]);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  setTimeout(() => dispatch(setUrl(urlinput || url)));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const executeQuery = async () => {
    const filteredQuery = getFilteredQuery(query);
    const requestHeaders = Object.fromEntries(headers.map((header) => [header.key, header.value]).reverse());

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

      const res = await fetcher(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          operationName,
          query: !operationName && queryType === 'query' && !isVariablesProvidedInTheQuery ? reqQuery : filteredQuery,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });
      dispatch(setResponse(res));
      return res;
    } catch (error) {
      toast.error(error as string);
    }
  };

  const sendQuery = () => {
    if (isValid) {
      void executeQuery();
    } else {
      toast.error(toastMessages.urlNotProvided);
    }
  };

  const updateUrl = () => {
    router.push(setBrowserUrl(url, query, headers));
  };

  function edit(value: string) {
    dispatch(setQuery(value));
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UrlGraphql>({
    resolver: yupResolver(urlValidationSchema),
  });

  return (
    <GraphiQLProvider fetcher={gqlFetcher} query={!query ? (queryinput ? queryinput.slice(1, -1) : '') : undefined}>
      <div>
        <div className="graphiql-container">
          <section className="px-3 pt-3">
            <form>
              <UrlSection urlinput={urlinput} errors={errors} register={register} />
            </form>
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Query" {...a11yProps(0)} className="h-12" />
                <Tab label="Headers" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div>
                <div className="sticky top-0 z-10 flex justify-center gap-2">
                  <PrettifyButton />
                  <Button onClick={handleSubmit(sendQuery)} type="submit" variant="contained">
                    Send
                  </Button>
                </div>
                <div className="flex" onBlur={updateUrl}>
                  <QueryEditor onEdit={edit} />
                  <Documentation />
                </div>
              </div>
              <Accordion className="sticky bottom-0 bg-gray-100 text-orange-600">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  VARIABLES
                </AccordionSummary>
                <AccordionDetails>
                  <VariablesSection />
                </AccordionDetails>
              </Accordion>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <GraphiqlHeader headersinput={headersinput} />
            </CustomTabPanel>
          </section>
        </div>
      </div>
    </GraphiQLProvider>
  );
};

export default GraphiQLClient;
