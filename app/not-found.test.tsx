import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './not-found';

vi.mock('next/error', () => ({
  default: ({ statusCode }: { statusCode: number }) => <div>Error: {statusCode}</div>,
}));

describe('NotFound component', () => {
  it('should render the 404 error page', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Error: 404')).toBeInTheDocument();
  });
});
