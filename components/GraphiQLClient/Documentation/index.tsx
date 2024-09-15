'use client';

import { ResizableHandle, ResizablePanel } from '@/components/Resizable';
import { DocExplorer, useSchemaContext } from '@graphiql/react';
import '@graphiql/react/dist/style.css';

const Documentation = () => {
  const schemaContext = useSchemaContext();

  return (
    <>
      {!schemaContext?.fetchError && (
        <>
          <ResizableHandle direction="horizontal" />
          <ResizablePanel
            id="documentation"
            order={2}
            className="flex flex-col"
            minSizePercentage={10}
            defaultSizePercentage={40}
          >
            <div className="graphiql-container overflow-hidden">
              <div className="h-full overflow-auto px-4">
                <DocExplorer />
              </div>
            </div>
          </ResizablePanel>
        </>
      )}
    </>
  );
};
export default Documentation;
