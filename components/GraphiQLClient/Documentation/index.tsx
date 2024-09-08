'use client';

import { selectSdlUrl, selectUrl } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useAppSelector } from '@/redux/hooks';
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';
import { useMemo } from 'react';

const Documentation = () => {
  const url: string = useAppSelector(selectUrl);
  const sdlUrl: string = useAppSelector(selectSdlUrl);
  const fetcher = useMemo(() => createGraphiQLFetcher({ url: sdlUrl || url }), [sdlUrl, url]);

  return (
    <>
      {sdlUrl || url ? (
        <GraphiQLProvider fetcher={fetcher}>
          <div className="graphiql-container">
            <DocExplorer />
          </div>
        </GraphiQLProvider>
      ) : (
        <div>There is no url provided</div>
      )}
    </>
  );
};
export default Documentation;
