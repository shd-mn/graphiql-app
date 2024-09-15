import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  mainSlice,
  setResponse,
  resetResponse,
  setIsLoading,
  selectAllMainState,
  selectResponse,
} from '../../redux/features/mainSlice';

const store = configureStore({
  reducer: { main: mainSlice.reducer },
});

describe('mainSlice', () => {
  it('should return the initial state', () => {
    const state = store.getState().main;

    expect(state.response).toEqual({
      data: '',
      status: 0,
      statusText: '',
      parsedHeaders: {},
      success: false,
      responseTime: 0,
    });
    expect(state.isLoading).toBe(false);
  });

  it('should handle setResponse', () => {
    const mockResponse = {
      data: 'Test data',
      status: 200,
      statusText: 'OK',
      parsedHeaders: { 'Content-Type': 'application/json' },
      success: true,
      responseTime: 123,
    };

    store.dispatch(setResponse(mockResponse));
    const state = store.getState().main;

    expect(state.response).toEqual(mockResponse);
  });

  it('should handle resetResponse', () => {
    const mockResponse = {
      data: 'Test data',
      status: 200,
      statusText: 'OK',
      parsedHeaders: { 'Content-Type': 'application/json' },
      success: true,
      responseTime: 123,
    };

    store.dispatch(setResponse(mockResponse));
    store.dispatch(resetResponse());
    const state = store.getState().main;

    expect(state.response).toEqual({
      data: '',
      status: 0,
      statusText: '',
      parsedHeaders: {},
      success: false,
      responseTime: 0,
    });
  });

  it('should handle setIsLoading', () => {
    store.dispatch(setIsLoading(true));
    const state = store.getState().main;

    expect(state.isLoading).toBe(true);

    store.dispatch(setIsLoading(false));
    const updatedState = store.getState().main;

    expect(updatedState.isLoading).toBe(false);
  });

  it('should return the correct state using selectors', () => {
    const mockResponse = {
      data: 'Test data',
      status: 200,
      statusText: 'OK',
      parsedHeaders: { 'Content-Type': 'application/json' },
      success: true,
      responseTime: 123,
    };

    store.dispatch(setResponse(mockResponse));

    const state = store.getState();

    expect(selectResponse(state)).toEqual(mockResponse);
    expect(selectAllMainState(state)).toEqual(state.main);
  });
});
