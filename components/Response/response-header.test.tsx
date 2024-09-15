import { describe, it, expect, vi } from 'vitest';
import ResponseHeader from '@/components/Response/ResponseHeader';
import { customRender } from '@/__test__/test-utils';
import { fireEvent, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslations: vi.fn().mockImplementation(() => (key: string) => key),
}));

const preloadedState = {
  main: {
    response: {
      data: '{"key": "value"}',
      parsedHeaders: {
        'content-type': 'application/json',
        'x-custom-header': 'customValue',
      },
      status: 200,
      statusText: 'OK',
      responseTime: 123,
      success: true,
    },
    isLoading: false,
  },
};

const handleTabChange = vi.fn();

describe('ResponseHeader component', () => {
  it('should render the tabs and handle tab changes', () => {
    customRender(<ResponseHeader activeTab={0} handleTabChange={handleTabChange} />, { preloadedState });

    expect(screen.getByText('body')).toBeInTheDocument();
    expect(screen.getByText('headers')).toBeInTheDocument();

    fireEvent.click(screen.getByText('headers'));
    expect(handleTabChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should render the status, response time, and size correctly', () => {
    customRender(<ResponseHeader activeTab={0} handleTabChange={handleTabChange} />, { preloadedState });

    expect(screen.getByText('200 OK')).toBeInTheDocument();

    expect(screen.getByText('123 ms')).toBeInTheDocument();
  });
});
