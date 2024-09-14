import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StoreProvider } from './StoreProvider';

vi.mock('@reduxjs/toolkit/query', () => ({
  setupListeners: vi.fn().mockReturnValue(() => {}),
}));

describe('StoreProvider component', () => {
  it('should render children correctly', () => {
    const childrenContent = 'Child Content';

    render(
      <StoreProvider>
        <div>{childrenContent}</div>
      </StoreProvider>,
    );

    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });

  it('should initialize the store correctly', () => {
    const MockComponent = () => <div>Test Component</div>;

    render(
      <StoreProvider>
        <MockComponent />
      </StoreProvider>,
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
