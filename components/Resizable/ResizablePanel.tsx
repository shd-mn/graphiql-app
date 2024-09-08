'use client';
import { ComponentProps } from 'react';
import { Panel } from 'react-resizable-panels';

function ResizablePanel({ children, ...props }: ComponentProps<typeof Panel>) {
  return <Panel {...props}>{children}</Panel>;
}

export default ResizablePanel;
