import GraphiQLClient from '@/components/GraphiQL/GraphiQLClient';

function GraphQL() {
  return (
    <main className="flex h-[calc(100vh-8.5rem)] flex-col p-3">
      <div>Endpoint</div>
      <GraphiQLClient></GraphiQLClient>
    </main>
  );
}

export default GraphQL;
