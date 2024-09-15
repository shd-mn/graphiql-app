import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, vi, expect } from 'vitest';
import { FormState, UseFormRegister } from 'react-hook-form';
import { UrlGraphql } from '@/types/url-graphql.types';
import { graphiqlSlice } from '@/redux/features/graphiqlSlice';
import UrlSection from '@/components/GraphiQLClient/UrlSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: unknown) => key,
}));

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));
const store = configureStore({
  reducer: {
    graphiql: graphiqlSlice.reducer,
  },
});

describe('UrlSection Component', () => {
  const mockRegister = vi.fn() as UseFormRegister<UrlGraphql>;

  const mockErrors: FormState<UrlGraphql>['errors'] = {
    endpoint: { message: 'Invalid endpoint', type: 'required' },
    sdl: { message: 'Invalid SDL URL', type: 'pattern' },
  };

  it('should display error messages for endpoint and SDL when errors are passed', () => {
    render(
      <Provider store={store}>
        <UrlSection register={mockRegister} errors={mockErrors} />
      </Provider>,
    );

    expect(screen.getByLabelText('endpoint')).toBeInTheDocument();
    expect(screen.getByLabelText('sdl')).toBeInTheDocument();
  });
});
