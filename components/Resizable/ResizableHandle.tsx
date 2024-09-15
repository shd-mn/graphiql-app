'use client';
import { ComponentProps } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

interface ResizableHandleProps extends ComponentProps<typeof PanelResizeHandle> {
  direction?: 'vertical' | 'horizontal';
}

function ResizableHandle({ direction = 'vertical', ...props }: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      className={`z-50 flex items-center justify-center bg-gray-200 py-[1px] ${
        direction === 'horizontal' ? 'w-[1px]' : 'h-[1px]'
      }`}
      {...props}
    >
      <div
        className={`relative h-1 w-1 rounded-full bg-gray-400 before:absolute before:h-1 before:w-1 before:rounded-full before:bg-gray-400 before:content-[''] after:absolute after:h-1 after:w-1 after:rounded-full after:bg-gray-400 after:content-[''] ${
          direction === 'horizontal' ? 'before:top-[-6px] after:top-[6px]' : 'before:left-[-6px] after:left-[6px]'
        } `}
      ></div>
    </PanelResizeHandle>
  );
}

export default ResizableHandle;
