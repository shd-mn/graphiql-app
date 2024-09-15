import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NextIntlClientProvider } from 'next-intl';
import ErrorState from '@/components/Response/ErrorState';
import { mainSlice } from '@/redux/features/mainSlice';
import EmptyState from '@/components/Response/EmptyState';

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslations: vi.fn().mockImplementation(() => (key: string) => key),
}));

const mockStore = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
  preloadedState: {
    main: {
      response: {
        data: '',
        status: 0,
        statusText: 'An error occurred',
        parsedHeaders: {},
        success: false,
        responseTime: 0,
      },
      isLoading: false,
    },
  },
});

describe('Response component', () => {
  it('should render the error state with correct translations and status text', () => {
    render(
      <Provider store={mockStore}>
        <NextIntlClientProvider locale="en">
          <ErrorState />
        </NextIntlClientProvider>
      </Provider>,
    );

    expect(screen.getByText('response')).toBeInTheDocument();
    expect(screen.getByText('couldNotSendRequest')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();

    const image = screen.getByAltText('couldNotSendRequest');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/public/assets/images/failed-fetch.webp'); // Ensure this path is correct
  });

  it('should render the empty state with correct translations and image', () => {
    render(
      <NextIntlClientProvider locale="en">
        <EmptyState />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('response')).toBeInTheDocument();
    expect(screen.getByText('clickToSend')).toBeInTheDocument();

    const image = screen.getByAltText('hitSendAlt');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/public/assets/svg/illustration-hit-send.svg'); // Adjust path if necessary
  });
});
