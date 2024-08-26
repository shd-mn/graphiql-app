import { Method, QueryParam } from '@/constants/restClientData';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RestfullSliceState {
  method: Method;
  url: string;
  queryParams: QueryParam[];
  headers: QueryParam[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RestfullSliceState = {
  method: 'GET',
  url: '',
  queryParams: [{ isChecked: true, key: '', value: '' }],
  headers: [{ isChecked: true, key: 'Content-Type', value: 'text/html; charset=utf-8' }],
  status: 'idle',
};

export const restfullSlice = createSlice({
  name: 'restfull',
  initialState,
  reducers: (create) => ({
    setMethod: create.reducer((state, action: PayloadAction<Method>) => {
      state.method = action.payload;
    }),
    setURL: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setQueryParam: create.reducer((state, action: PayloadAction<QueryParam[]>) => {
      state.queryParams = action.payload;
    }),
    setHeaders: create.reducer((state, action: PayloadAction<QueryParam[]>) => {
      state.headers = action.payload;
    }),
  }),

  selectors: {
    selectAll: (restfull) => restfull,
    selectMethod: (restfull) => restfull.method,
    selectUrl: (restfull) => restfull.url,
    selectStatus: (restfull) => restfull.status,
  },
});

export const { setMethod, setURL, setQueryParam, setHeaders } = restfullSlice.actions;

export const { selectAll, selectMethod, selectStatus } = restfullSlice.selectors;
