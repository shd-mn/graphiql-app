import GraphiQLClient from '@/components/GraphiQL/GraphiQLClient';
import ResponseSection from '@/components/RestClient/ResponseSection';

function GraphQL() {
  const stringfy = JSON.stringify({}, null, 1);
  return (
    <main className="flex h-[calc(100vh-8.5rem)] flex-col p-3">
      <GraphiQLClient></GraphiQLClient>
      <ResponseSection data={stringfy} />
    </main>
  );
}

export default GraphQL;
