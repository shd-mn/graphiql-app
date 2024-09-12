import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ResponseType } from '@/types';

export interface MainSliceState {
  response: ResponseType;
  isLoading: boolean;
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
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<ResponseType>) => {
      state.response = action.payload;
    },
    resetResponse: (state) => {
      state.response = initialState.response;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  selectors: {
    selectResponse: (main: MainSliceState) => main.response,
    selectAllMainState: (main: MainSliceState) => main,
  },
});

export const { setResponse, resetResponse, setIsLoading } = mainSlice.actions;
export const { selectResponse, selectAllMainState } = mainSlice.selectors;
