import { ReactElement, PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import userEvent from '@testing-library/user-event';
import { mainSlice } from '@/redux/features/mainSlice';
import { graphiqlSlice } from '@/redux/features/graphiqlSlice';
import { restfulSlice } from '@/redux/features/restfulSlice';

const mockUseRouter: Partial<AppRouterInstance> = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
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
}

export function customRender(ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouterContext.Provider value={mockUseRouter as AppRouterInstance}>{children}</AppRouterContext.Provider>
      </ThemeProvider>
    </Provider>
  );

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
