import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Loading from './loading';

vi.mock('@/components/UI/Ellipsis', () => ({
  default: () => <div>Mocked Ellipsis</div>,
}));

describe('Loading component', () => {
  it('should render the Ellipsis component and have the correct structure', () => {
    render(<Loading />);

    expect(screen.getByText('Mocked Ellipsis')).toBeInTheDocument();

    const container = screen.getByText('Mocked Ellipsis').parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('h-[calc(100vh-6rem)]');
    expect(container).toHaveClass('w-screen');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
