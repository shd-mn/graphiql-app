import { describe, it, expect } from 'vitest';
import { urlValidationSchema } from './url-graphql.validation';

describe('urlValidationSchema', () => {
  it('should validate valid data correctly', async () => {
    const validData = {
      endpoint: 'https://example.com/api',
      sdl: 'schema definition language content',
    };

    await expect(urlValidationSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should throw an error if endpoint is missing', async () => {
    const invalidData = {
      endpoint: '',
      sdl: 'schema definition language content',
    };

    await expect(urlValidationSchema.validate(invalidData)).rejects.toThrow('Endpoint is required');
  });

  it('should throw an error if sdl is missing', async () => {
    const invalidData = {
      endpoint: 'https://example.com/api',
      sdl: '',
    };

    await expect(urlValidationSchema.validate(invalidData)).rejects.toThrow('SDL is required');
  });
});
