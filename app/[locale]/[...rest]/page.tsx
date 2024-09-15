import RestForm from '@/components/RestClient';
import ResponseSection from '@/components/Response';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@/components/Resizable';

export default function RESTful() {
  return (
    <main className="flex h-[calc(100vh-6rem)]">
      <ResizableGroup autoSaveId="restful" direction="vertical">
        <ResizablePanel defaultSizePercentage={50} minSizePercentage={20}>
          <RestForm />
        </ResizablePanel>
        <ResizableHandle direction="vertical" />
        <ResizablePanel defaultSizePercentage={50} minSizePixels={36}>
          <ResponseSection />
        </ResizablePanel>
      </ResizableGroup>
    </main>
  );
}
