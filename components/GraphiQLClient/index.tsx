'use client';

import React, { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../UI/CustomTabPanel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAll, setQuery, setUrl } from '@/redux/features/graphiqlSlice';
import { setIsLoading, setResponse } from '@/redux/features/mainSlice';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
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
import { fetcher } from '@/services/response';
import { a11yProps } from '@/utils/a11yProps';
import { getFilteredQuery } from '@/utils/getiFlteredQuery';
import { setBrowserUrl } from '@/utils/setBrowserUrl';
import { ResizableGroup, ResizablePanel } from '../Resizable';
import '@graphiql/react/dist/style.css';

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
  const t = useTranslations('GraphQLClient');
  const tToast = useTranslations('ToastMessages');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const executeQuery = async () => {
    dispatch(setIsLoading(true));
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
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const sendQuery = () => {
    if (isValid) {
      void executeQuery();
    } else {
      toast.error(tToast('general.urlNotProvided'));
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
      <div className="graphiql-container flex h-full max-h-[70vh] flex-col">
        <section className="padding-x flex h-full flex-grow flex-col overflow-hidden pt-3">
          <form>
            <UrlSection urlinput={urlinput} errors={errors} register={register} />
          </form>
          <Paper className="mb-2 flex flex-grow flex-col overflow-hidden" elevation={2}>
            <ResizableGroup autoSaveId="graphql" direction="horizontal">
              <ResizablePanel id="query" order={1} className="flex flex-col" minSizePercentage={20}>
                <Box className="flex items-center justify-between">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="graphiql tabs"
                    TabIndicatorProps={{
                      className: 'bg-orange-500 flex px-4 mb-0 h-[2px] bottom-2',
                    }}
                  >
                    <Tab label={t('query')} {...a11yProps(0)} className="mx-4 min-w-max px-0 py-0 capitalize" />
                    <Tab label={t('headers')} {...a11yProps(1)} className="me-4 min-w-max px-0 py-0 capitalize" />
                  </Tabs>
                  <Box>
                    {value === 0 && <PrettifyButton />}
                    <Button onClick={handleSubmit(sendQuery)} type="submit" variant="contained" className="me-4 h-8">
                      {t('send')}
                    </Button>
                  </Box>
                </Box>

                <CustomTabPanel value={value} index={0} className="flex flex-grow flex-col overflow-hidden">
                  <div className="flex h-full w-full flex-col" onBlur={updateUrl}>
                    <QueryEditor onEdit={edit} />
                  </div>
                  <Accordion className="m-0 flex flex-col bg-gray-100">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="m-0 h-8 min-h-0 px-2 py-1"
                    >
                      {t('variables')}
                    </AccordionSummary>
                    <AccordionDetails className="flex h-full flex-grow p-0">
                      <VariablesSection />
                    </AccordionDetails>
                  </Accordion>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1} className="flex flex-grow-0 flex-col overflow-hidden">
                  <GraphiqlHeader headersinput={headersinput} />
                </CustomTabPanel>
              </ResizablePanel>

              <Documentation />
            </ResizableGroup>
          </Paper>
        </section>
      </div>
    </GraphiQLProvider>
  );
};

export default GraphiQLClient;
