import { describe, it, expect } from 'vitest';
import { createQueryString } from '@/utils/createQueryString';
import { RequestParam } from '@/types/api.types';

describe('createQueryString', () => {
  it('should return an empty string if the query is undefined', () => {
    expect(createQueryString(undefined)).toBe('');
  });

  it('should return an empty string if the query array is empty', () => {
    expect(createQueryString([])).toBe('');
  });

  it('should create a query string from valid parameters', () => {
    const query: RequestParam[] = [
      { key: 'name', value: 'John Doe', isChecked: true },
      { key: 'age', value: '30', isChecked: true },
      { key: 'gender', value: 'male', isChecked: false },
    ];

    expect(createQueryString(query)).toBe('name=John%20Doe&age=30');
  });

  it('should exclude parameters with missing keys or values', () => {
    const query: RequestParam[] = [
      { key: 'name', value: 'John Doe', isChecked: true },
      { key: '', value: '30', isChecked: true },
      { key: 'gender', value: '', isChecked: true },
      { key: 'email', value: 'john@example.com', isChecked: false },
    ];

    expect(createQueryString(query)).toBe('name=John%20Doe');
  });

  it('should handle parameters with special characters in values', () => {
    const query: RequestParam[] = [{ key: 'search', value: 'test & special=chars', isChecked: true }];

    expect(createQueryString(query)).toBe('search=test%20%26%20special%3Dchars');
  });
});
