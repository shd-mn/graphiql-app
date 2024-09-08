'use client';
import { ComponentProps } from 'react';
import { PanelGroup } from 'react-resizable-panels';

function ResizableGroup({ children, ...props }: ComponentProps<typeof PanelGroup>) {
  return <PanelGroup {...props}>{children}</PanelGroup>;
}
export default ResizableGroup;
