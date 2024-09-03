'use client';
import { selectSchema } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { useAppSelector } from '@/redux/hooks';
import { GraphQLSchema } from 'graphql/type';

const Documentation = () => {
  const schema: GraphQLSchema | null = useAppSelector(selectSchema);
  console.log(schema, 'schemaa');

  return (
    <div>
      <h3>Documentation</h3>
      {schema ? <p>{JSON.stringify(schema)}</p> : <p>No schema</p>}
    </div>
  );
};
export default Documentation;
