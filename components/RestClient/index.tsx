'use client';
import { useEffect, useState } from 'react';
import InputTable from '@/components/Table/InputTable';
import { Box, Button, FormControl, MenuItem, OutlinedInput, Select, Tab, Tabs, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { methods } from '@/constants/restClientData';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CustomTabPanel from '../UI/CustomTabPanel';
import { selectAll, setAllState } from '@/redux/features/restfullClient/restfullSlice';
import type { Method, Param, RequestType } from '@/types';
import { fetcher } from '@/services/response';
import { generateUrl } from '@/utils/generateUrl';
import { nanoid } from '@reduxjs/toolkit';
import { setResponse, setIsLoading } from '@/redux/features/mainSlice';
import { a11yProps } from '@/utils/a11yProps';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

export type Inputs = {
  method: Method;
  url: string;
  params: Param[];
  headers: Param[];
  body: string;
  variables: Param[];
};

function RestForm() {
  const [activeTab, setActiveTab] = useState(0);
  const { storedValue: request, setLocalStorageValue } = useLocalStorage<RequestType[]>('requests', []);
  const dispatch = useAppDispatch();
  const { method, url, params, headers, body, variables } = useAppSelector(selectAll);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      method,
      url,
      params,
      headers,
      body,
      variables,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setIsLoading(true));
    const { url, method, params, headers, body, variables } = data;
    const id = nanoid();
    const date = `${new Date().toISOString()}`;

    const newRequest: RequestType = { id, method, url, params, headers, body, variables, date };
    setLocalStorageValue([...request, newRequest]);
    dispatch(setAllState(newRequest));

    const fetchHeaders: Record<string, string> = {};
    const fetchBody: string = body;

    headers.forEach((header) => {
      if (header.isChecked && header.key) {
        fetchHeaders[header.key] = header.value;
      }
    });

    const res = await fetcher(url, {
      method: data.method,
      headers: fetchHeaders,
      body: fetchBody,
    });
    dispatch(setResponse(res));
    dispatch(setIsLoading(false));

    const generatedUrl = generateUrl(newRequest);
    router.push(`${generatedUrl}`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (errors.url?.type === 'required') toast.error('Url not provided. Please provide endpoint url.');
  }, [errors.url]);

  const selectedColor = methods.find((item) => item.name === watch('method'))?.color;

  return (
    <section className="padding-x h-full flex-1 pt-3">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="mb-2 flex w-full items-start justify-between">
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  className={`min-w-28 rounded-e-none font-medium ${selectedColor ? selectedColor : 'text-green-500'}`}
                  autoWidth
                  size="small"
                >
                  {methods.map((method, idx) => (
                    <MenuItem key={idx} value={method?.name} className={`font-medium ${method.color}`}>
                      {method?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="method"
              control={control}
            />
            <FormControl fullWidth>
              <OutlinedInput
                type="text"
                {...register('url', { required: true })}
                error={!!errors.url}
                placeholder="https://example.com"
                size="small"
                className="rounded-s-none"
              />
            </FormControl>

            <Button disabled={isSubmitting} variant="contained" className="ml-2 h-10" type="submit">
              SEND
            </Button>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="restfull request tabs"
            TabIndicatorProps={{
              className: 'bg-orange-500 mb-0 h-[2px] bottom-2',
            }}
          >
            <Tab label="Params" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(0)} />
            <Tab label="Headers" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(1)} />
            <Tab label="Body" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(2)} />
            <Tab label="Variables" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(3)} />
          </Tabs>

          <CustomTabPanel value={activeTab} index={0}>
            <Typography className="text-sm">Query Params</Typography>
            <InputTable inputName="params" />
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={1}>
            <Typography className="text-sm">Headers</Typography>
            <InputTable inputName="headers" />
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={2}>
            <Controller
              render={({ field }) => (
                <Editor
                  {...field}
                  defaultLanguage="json"
                  theme="vs-dark"
                  options={{
                    minimap: {
                      enabled: false,
                    },
                    formatOnPaste: true,
                    formatOnType: true,
                    lineNumbersMinChars: 4,
                    wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
                    wordWrap: 'on',
                    wordWrapBreakAfterCharacters: '\t})]?|&,;',
                    wordWrapBreakBeforeCharacters: '{([+',
                    wordWrapColumn: 80,
                    wrappingIndent: 'indent',
                  }}
                />
              )}
              name="body"
              control={control}
            />
            Body
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={3}>
            <Typography className="text-sm">Variables</Typography>
            <InputTable inputName="variables" />
          </CustomTabPanel>
        </form>
      </FormProvider>
    </section>
  );
}

export default RestForm;
