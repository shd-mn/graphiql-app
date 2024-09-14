import { describe, it, expect } from 'vitest';
import { getFilteredQuery } from '@/utils/getiFlteredQuery';

describe('getFilteredQuery', () => {
  it('should handle a string with no newlines or comments', () => {
    const query = 'SELECT * FROM orders;';
    expect(getFilteredQuery(query)).toBe('SELECT * FROM orders;');
  });

  it('should handle an empty string', () => {
    const query = '';
    expect(getFilteredQuery(query)).toBe('');
  });
});
