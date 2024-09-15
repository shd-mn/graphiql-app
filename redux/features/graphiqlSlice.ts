import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphiqlSliceState {
  query: string;
  variables: string;
  headers: GQLHeader[];
  url: string;
  sdlUrl: string;
  response: string;
  appLoaded: boolean;
}

export interface GQLHeader {
  key: string;
  value: string;
}

const initialState: GraphiqlSliceState = {
  query: '',
  variables: '',
  headers: [{ key: 'Content-Type', value: 'application/json' }],
  url: '',
  sdlUrl: '',
  response: '',
  appLoaded: false,
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
    setHeaders: create.reducer((state, action: PayloadAction<GQLHeader[]>) => {
      state.headers = action.payload;
    }),
    setUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setSdlUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.sdlUrl = action.payload;
    }),
    setAppLoaded: create.reducer((state) => {
      state.appLoaded = true;
    }),
  }),

  selectors: {
    selectAll: (graphiql) => graphiql,
    selectHeaders: (graphiql) => graphiql.headers,
  },
});

export const { setQuery, setVariables, setHeaders, setUrl, setSdlUrl, setAppLoaded } = graphiqlSlice.actions;

export const { selectAll, selectHeaders } = graphiqlSlice.selectors;
