import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ResponseType } from '@/types';

export interface MainSliceState {
  response: ResponseType;
}

const initialState: MainSliceState = {
  response: {
    data: '',
    status: 0,
    statusText: '',
    parsedHeaders: {},
    success: false,
    responseTime: 0,
  },
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: (create) => ({
    setResponse: create.reducer((state, action: PayloadAction<ResponseType>) => {
      state.response = action.payload;
    }),
    resetResponse: create.reducer((state) => {
      state.response = initialState.response;
    }),
  }),

  selectors: {
    selectResponse: (main) => main.response,
  },
});

export const { setResponse, resetResponse } = mainSlice.actions;

export const { selectResponse } = mainSlice.selectors;
