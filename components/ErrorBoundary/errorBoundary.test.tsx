import { render, screen } from '@testing-library/react';
import ErrorBoundary from '.';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary Component', () => {
  it('should catch errors and display the fallback UI', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback="Something went wrong!">
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
    spy.mockRestore();
  });
});
