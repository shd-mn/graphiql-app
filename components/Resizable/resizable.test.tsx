import { describe, it, expect, vi } from 'vitest';
import * as ResizableExports from './index';
import { customRender } from '@/__test__/test-utils';
import ResizableGroup from '@/components/Resizable/ResizableGroup';
import { screen } from '@testing-library/react';
import { ResizableHandle, ResizablePanel } from './index';

type ReactResizablePanelsModule = {
  PanelResizeHandle: React.ComponentType<unknown>;
};

vi.mock('react-resizable-panels', async (importOriginal) => {
  const originalModule = (await importOriginal()) as ReactResizablePanelsModule;

  return {
    ...originalModule,
    PanelResizeHandle: originalModule.PanelResizeHandle,
  };
});

describe('Resizable', () => {
  it('should export ResizableGroup', () => {
    expect(ResizableExports.ResizableGroup).toBeDefined();
  });

  it('should export ResizablePanel', () => {
    expect(ResizableExports.ResizablePanel).toBeDefined();
  });

  it('should export ResizableHandle', () => {
    expect(ResizableExports.ResizableHandle).toBeDefined();
  });

  it('should render children correctly', () => {
    customRender(
      <ResizableGroup direction={'horizontal'}>
        <div>Child Element</div>
      </ResizableGroup>,
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  it('should forward props to PanelGroup', () => {
    const testProps = { className: 'test-class', style: { margin: '10px' } };

    customRender(
      <ResizableGroup direction={'horizontal'} {...testProps}>
        <div>Child Element</div>
      </ResizableGroup>,
    );

    const panelGroup = screen.getByText('Child Element').parentElement;
    expect(panelGroup).toHaveClass('test-class');
    expect(panelGroup).toHaveStyle('margin: 10px');
  });

  it('renders within a vertical ResizableGroup', () => {
    customRender(
      <ResizableGroup direction="vertical">
        <ResizableHandle direction="vertical" />
      </ResizableGroup>,
    );

    const handle = screen.getByRole('separator');
    expect(handle).toHaveClass('h-[1px]');
  });

  it('renders within a horizontal ResizableGroup', () => {
    customRender(
      <ResizableGroup direction="horizontal">
        <ResizableHandle direction="horizontal" />
      </ResizableGroup>,
    );

    const handle = screen.getByRole('separator');
    expect(handle).toHaveClass('w-[1px]');
  });

  it('renders ResizablePanel correctly with default size percentage', () => {
    customRender(
      <ResizableGroup direction="horizontal">
        <ResizablePanel defaultSizePercentage={50}>
          <div>Panel Content</div>
        </ResizablePanel>
      </ResizableGroup>,
    );

    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('renders ResizablePanel correctly with default size pixels', () => {
    customRender(
      <ResizableGroup direction="vertical">
        <ResizablePanel defaultSizePixels={300}>
          <div>Panel Content with Pixels</div>
        </ResizablePanel>
      </ResizableGroup>,
    );

    expect(screen.getByText('Panel Content with Pixels')).toBeInTheDocument();
  });
});
