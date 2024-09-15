import { ReactElement, PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import userEvent from '@testing-library/user-event';
import { mainSlice } from '@/redux/features/mainSlice';
import { graphiqlSlice } from '@/redux/features/graphiqlSlice';
import { restfulSlice } from '@/redux/features/restfulSlice';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import enLocale from '../messages/en.json';
import ruLocale from '../messages/ru.json';

const mockUseRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname: '/',
  locale: 'en',
  locales: ['en', 'ru'],
  route: '/',
};

const rootReducer = combineReducers({
  main: mainSlice.reducer,
  restful: restfulSlice.reducer,
  graphiql: graphiqlSlice.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  locale?: string;
  messages?: Record<string, string | AbstractIntlMessages>;
}

export function customRender(ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    locale = 'en',
    messages = locale === 'en' ? enLocale : ruLocale,
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouterContext.Provider value={mockUseRouter}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AppRouterContext.Provider>
      </ThemeProvider>
    </Provider>
  );

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
