import { describe, it, expect } from 'vitest';
import { getStatusColor } from '@/utils/getStatusColor';

describe('getStatusColor', () => {
  it('should return the correct color for status codes starting with 1', () => {
    expect(getStatusColor(100)).toBe('bg-blue-700 text-blue-200');
    expect(getStatusColor(199)).toBe('bg-blue-700 text-blue-200');
  });

  it('should return the correct color for status codes starting with 2', () => {
    expect(getStatusColor(200)).toBe('bg-green-700 text-green-200');
    expect(getStatusColor(299)).toBe('bg-green-700 text-green-200');
  });

  it('should return the correct color for status codes starting with 3', () => {
    expect(getStatusColor(300)).toBe('bg-yellow-700 text-yellow-200');
    expect(getStatusColor(399)).toBe('bg-yellow-700 text-yellow-200');
  });

  it('should return the correct color for status codes starting with 4 or 5', () => {
    expect(getStatusColor(400)).toBe('bg-red-700 text-red-200');
    expect(getStatusColor(499)).toBe('bg-red-700 text-red-200');
    expect(getStatusColor(500)).toBe('bg-red-700 text-red-200');
    expect(getStatusColor(599)).toBe('bg-red-700 text-red-200');
  });

  it('should handle non-numeric input gracefully', () => {
    expect(getStatusColor(NaN)).toBe('bg-gray-700 text-gray-200');
    expect(getStatusColor(Number('string'))).toBe('bg-gray-700 text-gray-200');
  });
});
