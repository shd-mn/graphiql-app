import ResponseSection from '@/components/RestClient/Response';
import GraphiQLClient from '@/components/GraphiQLClient';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@/components/Resizable';

// interface Props {
//   params?: {
//     endpoint: string[];
//   };
//   searchParams?: {
//     key: string;
//     value: string;
//   };
// }
//
// function GraphQL({ params }: Props) {
//   const responseData = params?.endpoint;
//   const data = responseData ? Buffer.from(responseData[0], 'base64').toString('utf-8') : '';
//
//   return (
//     <main className="flex h-[calc(100vh-8.5rem)] flex-col p-3">
//
//       <GraphiQLClient></GraphiQLClient>
//       <ResponseSection data={data} />
//     </main>
//   );
// }

function GraphQL() {
  return (
    <main className="gql flex h-[calc(100vh-6rem)] flex-col p-3">
      <ResizableGroup autoSaveId="graphql" direction="vertical">
        <ResizablePanel defaultSizePercentage={50} minSizePercentage={15} id="gql-panel">
          <GraphiQLClient />
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
