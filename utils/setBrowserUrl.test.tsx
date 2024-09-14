import { describe, it, expect, vi } from 'vitest';
import { setBrowserUrl } from './setBrowserUrl';
import { textToBase64 } from '@/utils/coderBase64';
import { getFilteredQuery } from '@/utils/getiFlteredQuery';
import { routes } from '@/constants/routes';
import { GQLHeader } from '@/redux/features/graphiqlSlice';

vi.mock('@/utils/coderBase64', () => ({
  textToBase64: vi.fn((text: string) => Buffer.from(text).toString('base64')),
}));

vi.mock('@/utils/getiFlteredQuery', () => ({
  getFilteredQuery: vi.fn((query: string) => query.trim()),
}));

describe('setBrowserUrl', () => {
  it('should handle empty query and headers', () => {
    const url = 'https://example.com/api/v1/data';
    const query = '';
    const headers: GQLHeader[] = [];

    const encodedUrl = textToBase64(url);
    const encodedBody = textToBase64(JSON.stringify(getFilteredQuery(query)));
    const headersForUrl = '';
    const expectedUrl = `${routes.graphql}/${encodedUrl}/${encodedBody}${headersForUrl}`;

    expect(setBrowserUrl(url, query, headers)).toBe(expectedUrl);
  });

  it('should handle special characters in headers', () => {
    const url = 'https://example.com/api/v1/data';
    const query = 'some query';
    const headers: GQLHeader[] = [{ key: 'Custom-Header', value: 'value with special characters !@#$%^&*()' }];

    const encodedUrl = textToBase64(url);
    const encodedBody = textToBase64(JSON.stringify(getFilteredQuery(query)));
    const headersForUrl = '?Custom-Header=value with special characters !@#$%^&*()';
    const expectedUrl = `${routes.graphql}/${encodedUrl}/${encodedBody}${headersForUrl}`;

    expect(setBrowserUrl(url, query, headers)).toBe(expectedUrl);
  });
});
