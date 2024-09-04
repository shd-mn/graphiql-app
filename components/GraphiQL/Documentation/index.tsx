'use client';

import { selectUrl } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useAppSelector } from '@/redux/hooks';
import {
  DocExplorer,
  GraphiQLProvider,
  QueryEditor,
  usePrettifyEditors,
  ResponseEditor,
  useQueryEditor,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';
import { Button } from '@mui/material';
import { useMemo } from 'react';

const Documentation = () => {
  const url: string = useAppSelector(selectUrl);
  const fetcher = useMemo(() => createGraphiQLFetcher({ url }), [url]);

  function edit(a: string) {
    console.log(a);
  }

  function PrettifyButton() {
    const editor = useQueryEditor();
    const prettifyEditors = usePrettifyEditors();

    const handlePrettifyClick = () => {
      if (editor) {
        prettifyEditors();
      }
    };

    return <Button onClick={handlePrettifyClick}>Prettify query</Button>;
  }

  return (
    <>
      {url ? (
        <GraphiQLProvider fetcher={fetcher}>
          <div className="graphiql-container">
            <div className="h-64">
              <PrettifyButton />
              <QueryEditor onEdit={edit} />
            </div>
            <DocExplorer />
            <ResponseEditor></ResponseEditor>
          </div>
        </GraphiQLProvider>
      ) : (
        <div>There is no url provided</div>
      )}
    </>
  );
};
export default Documentation;
