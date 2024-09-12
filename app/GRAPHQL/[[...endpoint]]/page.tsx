import ResponseSection from '@/components/RestClient/Response';
import GraphiQLClient from '@/components/GraphiQLClient';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@/components/Resizable';
import { base64ToText } from '@/utils/coderBase64';

interface Props {
  params?: {
    endpoint: string[];
  };
  searchParams?: Record<string, string>;
}

function GraphQL({ params, searchParams }: Props) {
  const responseData = params?.endpoint;
  const url = Array.isArray(responseData) && responseData[0] ? base64ToText(responseData[0]?.replace('%3D', '=')) : '';
  const query =
    Array.isArray(responseData) && responseData[1]
      ? base64ToText(responseData[1]?.replace('%3D', '='))?.replace(/\\n/g, '\n')
      : '';

  return (
    <main className="gql flex h-[calc(100vh-6rem)] flex-col p-3">
      <ResizableGroup autoSaveId="graphql" direction="vertical">
        <ResizablePanel defaultSizePercentage={50} minSizePercentage={15} id="gql-panel">
          <GraphiQLClient urlinput={url} queryinput={query} headersinput={searchParams} />
        </ResizablePanel>
        <ResizableHandle direction="vertical" />
        <ResizablePanel defaultSizePercentage={50} minSizePercentage={15}>
          <ResponseSection />
        </ResizablePanel>
      </ResizableGroup>
    </main>
  );
}

export default GraphQL;
