import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default value'));

    expect(result.current.storedValue).toBe('default value');
  });

  it('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem('key', JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('key', 'default value'));

    expect(result.current.storedValue).toBe('stored value');
  });

  it('should update the state and localStorage when setting a new value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default value'));

    act(() => {
      result.current.setLocalStorageValue('new value');
    });

    expect(result.current.storedValue).toBe('new value');
    expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
  });

  it('should properly handle complex objects as values', () => {
    const complexValue = { a: 1, b: 'test' };
    const { result } = renderHook(() => useLocalStorage('key', complexValue));

    expect(result.current.storedValue).toEqual(complexValue);

    const newComplexValue = { a: 2, b: 'test2' };
    act(() => {
      result.current.setLocalStorageValue(newComplexValue);
    });

    expect(result.current.storedValue).toEqual(newComplexValue);
    expect(localStorage.getItem('key')).toBe(JSON.stringify(newComplexValue));
  });

  it('should use the default value if JSON parsing fails', () => {
    localStorage.setItem('key', 'invalid JSON');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('key', 'default value'));
    expect(result.current.storedValue).toBe('default value');
    spy.mockRestore();
  });
});
