import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Method, Param, RequestType } from '@/types';

export interface RestfullSliceState {
  id: string;
  method: Method;
  url: string;
  params: Param[];
  headers: Param[];
  body: string;
  variables: Param[];
  date: string;
}

const initialState: RestfullSliceState = {
  id: '',
  method: 'GET',
  url: '',
  params: [{ isChecked: false, key: '', value: '' }],
  headers: [{ isChecked: true, key: 'Content-Type', value: 'text/html; charset=utf-8' }],
  body: '',
  variables: [{ isChecked: false, key: '', value: '' }],
  date: '',
};

export const restfullSlice = createSlice({
  name: 'restfull',
  initialState,
  reducers: (create) => ({
    setAllState: create.reducer((state, action: PayloadAction<RequestType>) => {
      state.id = action.payload.id;
      state.method = action.payload.method;
      state.url = action.payload.url;
      state.params = action.payload.params;
      state.headers = action.payload.headers;
      state.body = action.payload.body;
      state.variables = action.payload.variables;
      state.date = action.payload.date;
    }),
    setMethod: create.reducer((state, action: PayloadAction<Method>) => {
      state.method = action.payload;
    }),
    setURL: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setQueryParam: create.reducer((state, action: PayloadAction<Param[]>) => {
      state.params = action.payload;
    }),
    setHeaders: create.reducer((state, action: PayloadAction<Param[]>) => {
      state.headers = action.payload;
    }),
  }),

  selectors: {
    selectAll: (restfull) => restfull,
    selectMethod: (restfull) => restfull.method,
    selectUrl: (restfull) => restfull.url,
  },
});

export const { setMethod, setAllState, setURL, setQueryParam, setHeaders } = restfullSlice.actions;

export const { selectAll, selectMethod } = restfullSlice.selectors;
