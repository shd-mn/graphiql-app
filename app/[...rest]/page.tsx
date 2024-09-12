import RestForm from '@/components/RestClient/Form';
import ResponseSection from '@/components/RestClient/Response';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@/components/Resizable';

export default function RESTfull() {
  return (
    <main className="flex h-[calc(100vh-6rem)]">
      <ResizableGroup autoSaveId="restfull" direction="vertical">
        <ResizablePanel defaultSizePercentage={50} minSizePercentage={15}>
          <RestForm />
        </ResizablePanel>
        <ResizableHandle direction="vertical" />
        <ResizablePanel defaultSizePercentage={50} minSizePixels={32}>
          <ResponseSection />
        </ResizablePanel>
      </ResizableGroup>
    </main>
  );
}
