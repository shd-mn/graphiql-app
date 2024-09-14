'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import InputTable from '@/components/Table/InputTable';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Editor from '@monaco-editor/react';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { methods } from '@/constants/restClientData';
import { useRouter } from '@/i18n/routing';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CustomTabPanel from '../UI/CustomTabPanel';
import { selectAll, setAllState } from '@/redux/features/restfulSlice';
import { fetcher } from '@/services/response';
import { generateUrl } from '@/utils/generateUrl';
import { nanoid } from '@reduxjs/toolkit';
import { setResponse, setIsLoading } from '@/redux/features/mainSlice';
import { a11yProps } from '@/utils/a11yProps';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { AddCircleOutline, AutoFixHigh } from '@mui/icons-material';
import type { editor } from 'monaco-editor';
import { createQueryString } from '@/utils/createQueryString';
import { replaceVariables } from '@/utils/replaceVariables';
import type { RequestFormTypes, ApiRequest } from '@/types/api.types';

function RestForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [bodyFormat, setBodyFormat] = useState<'json' | 'plaintext'>('json');
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const t = useTranslations('RestClient');
  const tToast = useTranslations('ToastMessages');
  const urlErrorMessage = useMemo(() => tToast('general.urlNotProvided'), [tToast]);

  const { storedValue: requests, setLocalStorageValue } = useLocalStorage<ApiRequest[]>('requests', []);
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

  const onSubmit: SubmitHandler<RequestFormTypes> = async (data) => {
    dispatch(setIsLoading(true));

    const id = nanoid();
    const date = `${new Date().toISOString()}`;
    const { url, params, headers, body } = replaceVariables(data);
    const newRequest: ApiRequest = { id, date, ...data };

    setLocalStorageValue([...requests, newRequest]);
    dispatch(setAllState(newRequest));

    const createdUrlParams = createQueryString(params);
    const urlParams = createdUrlParams && `?${createdUrlParams}`;

    const fetchUrl = `${url}${urlParams}`;
    const fetchHeaders: Record<string, string> = {};
    const fetchBody: string = body;

    headers.forEach((header) => {
      if (header.isChecked && header.key) {
        fetchHeaders[header.key] = header.value;
      }
    });

    const res = await fetcher(fetchUrl, {
      method: data.method,
      headers: fetchHeaders,
      body: fetchBody,
    });
    const generatedUrl = generateUrl(newRequest);
    router.push(`${generatedUrl}`);

    dispatch(setResponse(res));
    dispatch(setIsLoading(false));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const {
    fields: paramsFields,
    append: appendParams,
    remove: removeParams,
  } = useFieldArray({
    control,
    name: 'params',
  });
  const {
    fields: headersFields,
    append: appendHeaders,
    remove: removeHeaders,
  } = useFieldArray({
    control,
    name: 'headers',
  });
  const {
    fields: variablesFields,
    append: appendVariables,
    remove: removeVariables,
  } = useFieldArray({
    control,
    name: 'variables',
  });
  const handleAddInput = () => {
    if (activeTab === 0) appendParams({ isChecked: true, key: '', value: '' });
    if (activeTab === 1) appendHeaders({ isChecked: true, key: '', value: '' });
    if (activeTab === 3) appendVariables({ isChecked: true, key: '', value: '' });
  };

  const handleBodyFormatChange = (event: React.MouseEvent<HTMLElement>, newFormat: 'json' | 'plaintext' | null) => {
    if (newFormat !== null) {
      setBodyFormat(newFormat);
    }
  };

  const handlePrettify = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        try {
          const value = model.getValue();
          if (value.trim() === '') {
            return;
          }
          const formatted = bodyFormat === 'json' ? JSON.stringify(JSON.parse(value), null, 2) : value;
          model.setValue(formatted);
        } catch (error) {
          toast.error(tToast('general.prettifyError'));
        }
      }
    }
  };

  useEffect(() => {
    if (errors.url?.type === 'required') {
      toast.error(urlErrorMessage);
    }
  }, [errors.url, urlErrorMessage]);

  const selectedColor = methods.find((item) => item.name === watch('method'))?.color;

  return (
    <section className="padding-x h-full max-h-[50vh] pt-3">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
          <Box
            component="div"
            className="mb-1 grid w-full items-start justify-between max-sm:grid-cols-[auto_1fr] max-sm:gap-y-1 sm:flex"
          >
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  className={`rounded-e-none font-medium sm:min-w-28 ${selectedColor ? selectedColor : 'text-green-500'}`}
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

            <Button disabled={isSubmitting} variant="contained" className="col-span-full h-10 sm:ml-2" type="submit">
              {t('send')}
            </Button>
          </Box>

          <Tabs
            scrollButtons
            allowScrollButtonsMobile
            value={activeTab}
            onChange={handleTabChange}
            aria-label="restful request tabs"
            TabIndicatorProps={{
              className: 'bg-orange-500 mb-0 h-[2px] bottom-2',
            }}
          >
            <Tab label={t('params')} className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(0)} />
            <Tab label={t('headers')} className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(1)} />
            <Tab label={t('body')} className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(2)} />
            <Tab label={t('variables')} className="me-4 min-w-max px-0 py-0 capitalize" {...a11yProps(3)} />
          </Tabs>

          <Paper className="mb-3 flex flex-grow flex-col overflow-hidden" elevation={2}>
            <CustomTabPanel value={activeTab} index={0} className="flex flex-grow-0 flex-col overflow-hidden">
              <Box className="mb-1 flex items-center justify-between px-5 pt-2">
                <Typography className="text-sm">{t('queryParams')}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className="h-8"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddInput}
                >
                  {t('add')}
                </Button>
              </Box>

              <InputTable fields={paramsFields} inputName="params" remove={removeParams} />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={3} className="flex flex-grow-0 flex-col overflow-hidden">
              <Box className="mb-1 flex items-center justify-between px-5 pt-2">
                <Typography className="text-sm">{t('variables')}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className="h-8"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddInput}
                >
                  {t('add')}
                </Button>
              </Box>

              <InputTable fields={variablesFields} inputName="variables" remove={removeVariables} />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={1} className="flex flex-grow-0 flex-col overflow-hidden">
              <Box className="mb-1 flex items-center justify-between px-5 pt-2">
                <Typography className="text-sm">{t('headers')}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className="h-8"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddInput}
                >
                  {t('add')}
                </Button>
              </Box>
              <InputTable fields={headersFields} inputName="headers" remove={removeHeaders} />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={2} className="flex flex-grow flex-col overflow-hidden">
              <Box className="mb-1 flex items-center justify-between px-5 pt-2">
                <ToggleButtonGroup
                  value={bodyFormat}
                  exclusive
                  onChange={handleBodyFormatChange}
                  aria-label="body format"
                  size="small"
                >
                  <ToggleButton className="h-8" value="json" size="small" aria-label="JSON">
                    {t('json')}
                  </ToggleButton>
                  <ToggleButton className="h-8" value="plaintext" size="small" aria-label="Plain Text">
                    {t('text')}
                  </ToggleButton>
                </ToggleButtonGroup>
                {bodyFormat === 'json' && (
                  <Button
                    variant="outlined"
                    size="small"
                    className="h-8"
                    startIcon={<AutoFixHigh />}
                    onClick={handlePrettify}
                  >
                    {t('prettify')}
                  </Button>
                )}
              </Box>
              <Box className="flex flex-grow">
                <Controller
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      language={bodyFormat === 'json' ? 'json' : 'plaintext'}
                      theme="vs-dark"
                      onChange={(value) => field.onChange(value)}
                      onMount={(editor) => {
                        editorRef.current = editor;
                      }}
                      options={{
                        minimap: {
                          enabled: false,
                        },
                        smoothScrolling: true,
                        scrollbar: {
                          verticalScrollbarSize: 12,
                          horizontalScrollbarSize: 12,
                        },
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
                />
              </Box>
            </CustomTabPanel>
          </Paper>
        </form>
      </FormProvider>
    </section>
  );
}

export default RestForm;
