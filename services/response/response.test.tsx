import { describe, it, expect, vi } from 'vitest';
import { fetcher } from '@/services/response';

const mockResponse = {
  data: { message: 'Success' },
  status: 200,
  statusText: 'OK',
  headers: new Headers({ 'Content-Type': 'application/json' }), // Ensure headers are a Headers object
};

globalThis.fetch = vi.fn().mockResolvedValueOnce({
  status: mockResponse.status,
  statusText: mockResponse.statusText,
  headers: mockResponse.headers,
  json: async () => mockResponse.data,
  text: async () => JSON.stringify(mockResponse.data),
  clone: vi.fn().mockReturnThis(),
});

describe('fetcher', () => {
  it('should handle successful JSON response', async () => {
    const result = await fetcher('https://recipes-back-8dgq.onrender.com/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(result.data).toBe(JSON.stringify(mockResponse.data, null, 2));
    expect(result.status).toBe(mockResponse.status);
    expect(result.statusText).toBe(mockResponse.statusText);
    expect(result.responseTime).toBeGreaterThan(0);
  });
});
