import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Documentation from './index';
import { customRender } from '../../../__test__/test-utils';
import '@testing-library/jest-dom';

vi.mock('@/components/Resizable', () => ({
  __esModule: true,
  ResizableHandle: () => <div>ResizableHandle Mock</div>,
  ResizablePanel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@graphiql/react', () => ({
  DocExplorer: () => <div>DocExplorer Mock</div>,
  useSchemaContext: () => ({
    fetchError: null,
  }),
}));

describe('Documentation Component', () => {
  it('renders DocExplorer when there is no fetch error', () => {
    customRender(<Documentation />);

    expect(screen.getByText('DocExplorer Mock')).toBeInTheDocument();
  });
});
