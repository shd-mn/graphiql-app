'use client';

import { DocExplorer, useSchemaContext } from '@graphiql/react';
import '@graphiql/react/dist/style.css';

const Documentation = () => {
  const schemaContext = useSchemaContext();

  return (
    <>
      {!schemaContext?.fetchError ? (
        <div className="graphiql-container">
          <DocExplorer />
        </div>
      ) : (
        <div>There is an error</div>
      )}
    </>
  );
};
export default Documentation;
