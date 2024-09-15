import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  graphiqlSlice,
  setQuery,
  setVariables,
  setHeaders,
  setUrl,
  setSdlUrl,
  selectAll,
  selectHeaders,
} from '../../redux/features/graphiqlSlice';

const store = configureStore({
  reducer: { graphiql: graphiqlSlice.reducer },
});

describe('graphiqlSlice', () => {
  it('should return the initial state', () => {
    const state = store.getState().graphiql;

    expect(state.query).toBe('');
    expect(state.variables).toBe('');
    expect(state.headers).toEqual([{ key: 'Content-Type', value: 'application/json' }]);
    expect(state.url).toBe('');
    expect(state.sdlUrl).toBe('');
    expect(state.response).toBe('');
  });

  it('should handle setQuery', () => {
    const newQuery = 'query { user { id name } }';
    store.dispatch(setQuery(newQuery));

    const state = store.getState().graphiql;
    expect(state.query).toBe(newQuery);
  });

  it('should handle setVariables', () => {
    const newVariables = '{ "id": "123" }';
    store.dispatch(setVariables(newVariables));

    const state = store.getState().graphiql;
    expect(state.variables).toBe(newVariables);
  });

  it('should handle setHeaders', () => {
    const newHeaders = [{ key: 'Authorization', value: 'Bearer token' }];
    store.dispatch(setHeaders(newHeaders));

    const state = store.getState().graphiql;
    expect(state.headers).toEqual(newHeaders);
  });

  it('should handle setUrl', () => {
    const newUrl = 'https://example.com/graphql';
    store.dispatch(setUrl(newUrl));

    const state = store.getState().graphiql;
    expect(state.url).toBe(newUrl);
  });

  it('should handle setSdlUrl', () => {
    const newSdlUrl = 'https://example.com/sdl';
    store.dispatch(setSdlUrl(newSdlUrl));

    const state = store.getState().graphiql;
    expect(state.sdlUrl).toBe(newSdlUrl);
  });

  it('should return the correct state using selectors', () => {
    const mockState = {
      query: 'query { user { id name } }',
      variables: '{ "id": "123" }',
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
      url: 'https://example.com/graphql',
      sdlUrl: 'https://example.com/sdl',
      response: '',
    };

    store.dispatch(setQuery(mockState.query));
    store.dispatch(setVariables(mockState.variables));
    store.dispatch(setHeaders(mockState.headers));
    store.dispatch(setUrl(mockState.url));
    store.dispatch(setSdlUrl(mockState.sdlUrl));

    const state = store.getState();

    expect(selectHeaders(state)).toEqual(mockState.headers);
    expect(selectAll(state)).toEqual(state.graphiql);
  });
});
