import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  restfulSlice,
  setAllState,
  setMethod,
  setURL,
  setQueryParam,
  setHeaders,
  selectAll,
  selectMethod,
} from '@/redux/features/restfulSlice';
import { HttpMethod, RequestParam } from '@/types/api.types';

const { reducer: restfulReducer } = restfulSlice;

const store = configureStore({
  reducer: { restful: restfulReducer },
});

describe('restfulSlice', () => {
  it('should return the initial state', () => {
    const state = store.getState().restful;

    expect(state).toEqual({
      id: '',
      method: 'GET',
      url: '',
      params: [{ isChecked: false, key: '', value: '' }],
      headers: [{ isChecked: true, key: 'Content-Type', value: 'text/html; charset=utf-8' }],
      body: '',
      variables: [{ isChecked: false, key: '', value: '' }],
      date: '',
    });
  });

  it('should handle setMethod', () => {
    const newMethod: HttpMethod = 'POST';

    store.dispatch(setMethod(newMethod));
    const state = store.getState().restful;

    expect(state.method).toBe(newMethod);
  });

  it('should handle setURL', () => {
    const newUrl = 'https://api.example.com/data';

    store.dispatch(setURL(newUrl));
    const state = store.getState().restful;

    expect(state.url).toBe(newUrl);
  });

  it('should handle setQueryParam', () => {
    const newParams: RequestParam[] = [{ isChecked: true, key: 'id', value: '123' }];

    store.dispatch(setQueryParam(newParams));
    const state = store.getState().restful;

    expect(state.params).toEqual(newParams);
  });

  it('should handle setHeaders', () => {
    const newHeaders: RequestParam[] = [{ isChecked: true, key: 'Authorization', value: 'Bearer token' }];

    store.dispatch(setHeaders(newHeaders));
    const state = store.getState().restful;

    expect(state.headers).toEqual(newHeaders);
  });

  it('should handle setAllState', () => {
    const mockApiRequest = {
      id: '1',
      method: 'PUT' as HttpMethod,
      url: 'https://api.example.com/update',
      params: [{ isChecked: true, key: 'id', value: '456' }],
      headers: [{ isChecked: true, key: 'Authorization', value: 'Bearer new-token' }],
      body: '{"name":"new name"}',
      variables: [{ isChecked: false, key: '', value: '' }],
      date: '2024-09-14',
    };

    store.dispatch(setAllState(mockApiRequest));
    const state = store.getState().restful;

    expect(state).toEqual(mockApiRequest);
  });

  it('should return the correct state using selectors', () => {
    const mockState = {
      id: '1',
      method: 'POST' as HttpMethod,
      url: 'https://api.example.com/new-data',
      params: [{ isChecked: true, key: 'id', value: '789' }],
      headers: [{ isChecked: true, key: 'Authorization', value: 'Bearer new-token' }],
      body: '{"data":"some data"}',
      variables: [{ isChecked: false, key: '', value: '' }],
      date: '2024-09-15',
    };

    store.dispatch(setMethod(mockState.method));
    store.dispatch(setURL(mockState.url));
    store.dispatch(setQueryParam(mockState.params));
    store.dispatch(setHeaders(mockState.headers));

    const state = store.getState();

    expect(selectMethod(state)).toEqual(mockState.method);
    expect(selectAll(state)).toEqual(state.restful);
  });
});
