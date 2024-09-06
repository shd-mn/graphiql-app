import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphiqlSliceState {
  query: string;
  variables: string;
  headers: string;
  url: string;
  sdlUrl: string;
  response: string;
}

const initialState: GraphiqlSliceState = {
  query: '',
  variables: '',
  headers: '',
  url: '',
  sdlUrl: '',
  response: '',
};

export const graphiqlSlice = createSlice({
  name: 'graphiql',
  initialState,
  reducers: (create) => ({
    setQuery: create.reducer((state, action: PayloadAction<string>) => {
      state.query = action.payload;
    }),
    setVariables: create.reducer((state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    }),
    setHeaders: create.reducer((state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    }),
    setUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setSdlUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.sdlUrl = action.payload;
    }),
    setResponse: create.reducer((state, action: PayloadAction<string>) => {
      state.response = action.payload;
    }),
  }),

  selectors: {
    selectAll: (graphiql) => graphiql,
    selectQuery: (graphiql) => graphiql.query,
    selectHeaders: (graphiql) => graphiql.headers,
    selectVariables: (graphiql) => graphiql.variables,
    selectUrl: (graphiql) => graphiql.url,
    selectSdlUrl: (graphiql) => graphiql.sdlUrl,
    selectResponse: (graphiql) => graphiql.response,
  },
});

export const { setQuery, setVariables, setHeaders, setUrl, setSdlUrl, setResponse } = graphiqlSlice.actions;

export const { selectAll, selectQuery, selectHeaders, selectVariables, selectUrl, selectSdlUrl, selectResponse } =
  graphiqlSlice.selectors;
