import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { restfulSlice } from './features/restfulSlice';
import { graphiqlSlice } from '@/redux/features/graphiqlSlice';
import { mainSlice } from './features/mainSlice';

const rootReducer = combineSlices(mainSlice, restfulSlice, graphiqlSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
