import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HttpMethod, RequestParam, ApiRequest } from '@/types/api.types';

export interface RestfulSliceState {
  id: string;
  method: HttpMethod;
  url: string;
  params: RequestParam[];
  headers: RequestParam[];
  body: string;
  variables: RequestParam[];
  date: string;
}

const initialState: RestfulSliceState = {
  id: '',
  method: 'GET',
  url: '',
  params: [{ isChecked: true, key: '', value: '' }],
  headers: [{ isChecked: true, key: '', value: '' }],
  body: '',
  variables: [{ isChecked: true, key: '', value: '' }],
  date: '',
};

export const restfulSlice = createSlice({
  name: 'restful',
  initialState,
  reducers: (create) => ({
    setAllState: create.reducer((state, action: PayloadAction<ApiRequest>) => {
      state.id = action.payload.id;
      state.method = action.payload.method;
      state.url = action.payload.url;
      state.params = action.payload.params;
      state.headers = action.payload.headers;
      state.body = action.payload.body;
      state.variables = action.payload.variables;
      state.date = action.payload.date;
    }),
    setMethod: create.reducer((state, action: PayloadAction<HttpMethod>) => {
      state.method = action.payload;
    }),
    setURL: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setQueryParam: create.reducer((state, action: PayloadAction<RequestParam[]>) => {
      state.params = action.payload;
    }),
    setHeaders: create.reducer((state, action: PayloadAction<RequestParam[]>) => {
      state.headers = action.payload;
    }),
  }),

  selectors: {
    selectAll: (restful) => restful,
    selectMethod: (restful) => restful.method,
    selectUrl: (restful) => restful.url,
  },
});

export const { setMethod, setAllState, setURL, setQueryParam, setHeaders } = restfulSlice.actions;

export const { selectAll, selectMethod } = restfulSlice.selectors;
