import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from '@/app/layout';

vi.mock('next/font/google', () => ({
  Inter: vi.fn().mockReturnValue({ variable: '--mocked-font-inter' }),
}));

vi.mock('next-intl/server', () => ({
  getMessages: vi.fn().mockResolvedValue({}),
}));

vi.mock('@/components/PrivateRoute', () => ({
  default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

describe('RootLayout component', () => {
  it('should render the layout with children', async () => {
    const childrenContent = 'Main content';

    const { getByText } = render(
      <RootLayout>
        <div>{childrenContent}</div>
      </RootLayout>,
    );

    await waitFor(() => {
      expect(getByText('Main content')).toBeInTheDocument();
      expect(getByText(childrenContent)).toBeInTheDocument();
    });
  });
});
