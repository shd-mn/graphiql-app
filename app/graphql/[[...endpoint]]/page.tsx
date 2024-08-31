import GraphiQLClient from '@/components/GraphiQL/GraphiQLClient';
import ResponseSection from '@/components/RestClient/ResponseSection';

interface Props {
  params?: {
    endpoint: string[];
  };
  searchParams?: {
    key: string;
    value: string;
  };
}

function GraphQL({ params }: Props) {
  const responseData = params?.endpoint;
  const data = responseData ? Buffer.from(responseData[0], 'base64').toString('utf-8') : '';

  return (
    <main className="flex h-[calc(100vh-8.5rem)] flex-col p-3">
      <GraphiQLClient></GraphiQLClient>
      <ResponseSection data={data} />
    </main>
  );
}

export default GraphQL;
