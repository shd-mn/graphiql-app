import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { restfullSlice } from './features/restfullClient/restfullSlice';
import { mainSlice } from './features/mainSlice';
import { graphiqlSlice } from '@/redux/features/graphiqlClient/graphiqlSlice';
import { toastSlice } from '@/redux/features/toastMessage/toastSlice';

const rootReducer = combineSlices(mainSlice, restfullSlice, graphiqlSlice, toastSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
