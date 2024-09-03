import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphiqlSliceState {
  query: string;
  variables: string;
  url: string;
  sdlUrl: string;
  response: string;
  schema: string;
}

const initialState: GraphiqlSliceState = {
  query: '',
  variables: '',
  url: '',
  sdlUrl: '',
  response: '',
  schema: '',
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
    setUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.url = action.payload;
    }),
    setSdlUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.sdlUrl = action.payload;
    }),
    setResponse: create.reducer((state, action: PayloadAction<string>) => {
      state.response = action.payload;
    }),
    setSchema: create.reducer((state, action: PayloadAction<string>) => {
      state.schema = action.payload;
    }),
  }),

  selectors: {
    selectAll: (graphiql) => graphiql,
    selectQuery: (graphiql) => graphiql.query,
    selectVariables: (graphiql) => graphiql.variables,
    selectUrl: (graphiql) => graphiql.url,
    selectSdlUrl: (graphiql) => graphiql.sdlUrl,
    selectResponse: (graphiql) => graphiql.response,
    selectSchema: (graphiql) => graphiql.schema,
  },
});

export const { setQuery, setVariables, setUrl, setSdlUrl, setResponse, setSchema } = graphiqlSlice.actions;

export const { selectAll, selectQuery, selectVariables, selectUrl, selectSdlUrl, selectResponse, selectSchema } =
  graphiqlSlice.selectors;
