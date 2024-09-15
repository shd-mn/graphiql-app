import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResponseBody from '@/components/Response/ResponseBody';
import { mainSlice } from '@/redux/features/mainSlice';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslations: vi.fn().mockImplementation(() => (key: string) => key),
}));

vi.mock('@monaco-editor/react', () => ({
  default: ({ language, value }: { language: string; value: string }) => (
    <div>
      <p>Editor Language: {language}</p>
      <pre>{value}</pre>
    </div>
  ),
}));

const mockStore = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
  preloadedState: {
    main: {
      response: {
        data: '{"key": "value"}',
        status: 0,
        statusText: 'An error occurred',
        parsedHeaders: {
          'content-type': 'application/json',
          'x-custom-header': 'customValue',
        },
        success: false,
        responseTime: 0,
      },
      isLoading: false,
    },
  },
});

describe('ResponseBody component', () => {
  it('should render the editor and headers correctly', () => {
    render(
      <Provider store={mockStore}>
        <NextIntlClientProvider locale="en">
          <ResponseBody activeTab={0} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText(/Editor Language:/)).toBeInTheDocument();
    expect(screen.getByText('{"key": "value"}')).toBeInTheDocument();

    render(
      <Provider store={mockStore}>
        <NextIntlClientProvider locale="en">
          <ResponseBody activeTab={1} />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('key')).toBeInTheDocument();
    expect(screen.getByText('value')).toBeInTheDocument();
    expect(screen.getByText('content-type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });
});
