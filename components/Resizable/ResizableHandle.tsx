'use client';
import { ComponentProps } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface ResizableHandleProps extends ComponentProps<typeof PanelResizeHandle> {
  direction?: 'vertical' | 'horizontal';
}

function ResizableHandle({ direction = 'vertical', ...props }: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      className={`flex items-center justify-center bg-gray-200 ${direction === 'horizontal' ? 'w-[1px]' : 'h-[1px]'}`}
      {...props}
    >
      <MoreHorizIcon
        className={`rounded-sm bg-inherit ${direction === 'horizontal' && 'rotate-90'}`}
        fontSize="small"
      />
    </PanelResizeHandle>
  );
}

export default ResizableHandle;
