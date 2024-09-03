'use client';

import React from 'react';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabPanel from '@/components/RestClient/Form/CustomTabPanel';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode/cjs/dark';
import GraphiqlHeader from '@/components/GraphiQL/GraphiQLClient/GraphiqlHeader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectAll,
  setQuery,
  setResponse,
  setSchema,
  setUrl,
  setVariables,
} from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useRouter } from 'next/navigation';
import { buildClientSchema } from 'graphql/utilities';
import Documentation from '@/components/GraphiQL/Documentation';

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

  const executeQuery = async (operation: string | null = null, requestQuery: string | null = null) => {
    try {
      // todo: replace a with a value from query
      const operationName = operation ? operation : 'a';
      const reqQuery = requestQuery ?? query.slice(5);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName,
          query: reqQuery,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });

      const data = await res.json();

      dispatch(setResponse(data));
      if (operation) {
        const a = buildClientSchema(data.data);
        console.log(a, 'adata');
        dispatch(setSchema(data.data));
      }
      return data;
    } catch (error) {
      dispatch(setResponse('Failed to fetch data'));
    }
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };
  const schemaQuery =
    'query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n';

  const sendQuery = () => {
    executeQuery().then((data) => {
      const a = Buffer.from(JSON.stringify(data.data), 'utf-8').toString('base64');
      router.push(`/graphql/${a}`);
    });
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
          <Tab label="Documentation" {...a11yProps(3)} />
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
      <CustomTabPanel index={3} value={value}>
        <Documentation></Documentation>
      </CustomTabPanel>
      <Button onClick={() => sendQuery()}>Send</Button>
      <Button onClick={() => executeQuery('IntrospectionQuery', schemaQuery)}>Schema</Button>
    </section>
  );
};

export default GraphiQLClient;
