'use client';
import { useState } from 'react';
import InputTable from '@/components/RestClient/Table/InputTable';
import { restClientValidationSchema } from '@/validation/restclient.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, MenuItem, OutlinedInput, Select, Tab, Tabs, Typography } from '@mui/material';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { methods, QueryParam, type Method } from '@/constants/restClientData';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CustomTabPanel from './CustomTabPanel';
import { selectAll, setHeaders, setMethod, setQueryParam, setURL } from '@/redux/features/restfullClient/restfullSlice';
import { createQueryString } from '@/utils/createQueryString';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export type Inputs = {
  method: Method;
  url: string;
  queryParams?: QueryParam[];
  headers?: QueryParam[];
  body?: string;
};

function RestForm() {
  const dispatch = useAppDispatch();
  const { method, url, queryParams, headers } = useAppSelector(selectAll);
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: yupResolver(restClientValidationSchema),
    defaultValues: {
      method,
      url,
      queryParams,
      headers,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setMethod(data.method));
    dispatch(setURL(data.url));
    if (data.queryParams) {
      dispatch(setQueryParam(data.queryParams));
    }

    if (data.headers) {
      dispatch(setHeaders(data.headers));
    }

    const finalQueryString = createQueryString(data.queryParams);
    const headersQuery = createQueryString(data.headers);
    const base64Encoded = btoa(`${data.url}${finalQueryString}`);
    router.push(`/${data.method}/${base64Encoded}${headersQuery}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const selectedColor = methods.find((item) => item.name === watch('method'))?.color;
  return (
    <section>
      <FormProvider {...form}>
        <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="mb-2 flex w-full items-start justify-between">
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  className={`min-w-28 rounded-e-none font-medium ${selectedColor ? selectedColor : 'text-green-500'}`}
                  defaultValue="GET"
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
                {...register('url')}
                error={!!errors.url}
                placeholder="https://example.com"
                size="small"
                className="rounded-s-none"
              />
            </FormControl>

            <Button variant="contained" className="ml-2 h-10" type="submit">
              SEND
            </Button>
          </Box>

          <Box component="div">
            <Tabs
              value={activeTab}
              className=""
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ className: 'bg-orange-500 mb-0 h-[2px] bottom-2' }}
            >
              <Tab label="Params" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(0)} />
              <Tab label="Headers" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(1)} />
              <Tab label="Body" className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={activeTab} index={0}>
            <Typography className="text-sm">Query Params</Typography>
            <InputTable inputName="queryParams" />
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={1}>
            <Typography className="text-sm">Headers</Typography>
            <InputTable inputName="headers" />
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={2}>
            <Controller
              render={({ field }) => (
                <CodeMirror
                  {...field}
                  width="100%"
                  height="200"
                  theme={vscodeDark}
                  extensions={[json()]}
                  basicSetup={{
                    foldGutter: false,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: false,
                  }}
                />
              )}
              name="body"
              control={control}
            />
            Body
          </CustomTabPanel>
        </form>
      </FormProvider>
    </section>
  );
}
export default RestForm;
