import { describe, it, expect } from 'vitest';
import { dynamicColors } from '@/constants/colors';
import { HttpMethod } from '@/types/api.types';
import { methods } from '@/constants/restClientData';

describe('Constants', () => {
  it('should contain expected colors', () => {
    const expectedColors = [
      'bg-blue-700',
      'text-blue-200',
      'bg-green-700',
      'text-green-200',
      'bg-yellow-700',
      'text-yellow-200',
      'bg-red-700',
      'text-red-200',
      'bg-gray-700',
      'text-gray-200',
      'text-green-500',
      'text-yellow-500',
      'text-blue-500',
      'text-purple-500',
      'text-pink-500',
      'text-red-500',
      'text-green-700',
    ];

    expectedColors.forEach((color) => {
      expect(dynamicColors).toContain(color);
    });
  });

  it('should contain objects with name and color properties', () => {
    methods.forEach((method) => {
      expect(method).toHaveProperty('name');
      expect(method).toHaveProperty('color');
      expect(typeof method.name).toBe('string');
      expect(typeof method.color).toBe('string');
    });
  });

  it('should contain valid HTTP methods', () => {
    const validMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

    methods.forEach((method) => {
      expect(validMethods).toContain(method.name);
    });
  });

  it('should contain valid color classes', () => {
    const validColors = [
      'text-green-500',
      'text-yellow-500',
      'text-blue-500',
      'text-purple-500',
      'text-red-500',
      'text-green-700',
      'text-pink-500',
    ];

    methods.forEach((method) => {
      expect(validColors).toContain(method.color);
    });
  });
});
