import { describe, it, expect, vi } from 'vitest';
import { generateUrl } from './generateUrl';
import { createQueryString } from './createQueryString';
import type { ApiRequest, RequestParam } from '@/types/api.types';

vi.mock('./createQueryString', () => ({
  createQueryString: vi.fn((params) => {
    if (params === undefined) return '';
    if (params.length === 0) return '';

    const queryString = params
      .map((item: RequestParam) => {
        if (item.isChecked && item.key && item.value) {
          return `${item.key}=${encodeURIComponent(item.value)}`;
        }
        return null;
      })
      .filter(Boolean)
      .join('&');

    return queryString;
  }),
}));

describe('generateUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a URL with all components correctly encoded', () => {
    const req: ApiRequest = {
      method: 'GET',
      url: 'example.com/api',
      params: [{ key: 'search', value: 'test', isChecked: true }],
      body: JSON.stringify({ key: 'value' }),
      headers: [{ key: 'Authorization', value: 'Bearer token', isChecked: true }],
      id: '',
      variables: [],
      date: '',
    };

    const base64url = btoa(req.url);
    const param = createQueryString(req.params);
    const base64param = param && btoa(`?${param}`);
    const body = req.body && JSON.stringify(req.body);
    const base64body = body && `/${btoa(body)}`;
    const headers = createQueryString(req.headers);
    const headerQuery = headers && `?${headers}`;

    const expectedUrl = `/${req.method}/${base64url}${base64param}${base64body}${headerQuery}`;

    expect(generateUrl(req)).toBe(expectedUrl);
  });

  it('should handle cases where params, body, or headers are not provided', () => {
    const req: ApiRequest = {
      method: 'POST',
      url: 'example.com/api',
      body: JSON.stringify({ key: 'value' }),
      id: '',
      params: [],
      headers: [],
      variables: [],
      date: '',
    };

    const base64url = btoa(req.url);
    const body = req.body && JSON.stringify(req.body);
    const base64body = body && `/${btoa(body)}`;

    const expectedUrl = `/${req.method}/${base64url}${base64body}`;

    expect(generateUrl(req)).toBe(expectedUrl);
  });

  it('should handle cases where body is not provided', () => {
    const req: ApiRequest = {
      method: 'DELETE',
      url: 'example.com/api',
      params: [{ key: 'id', value: '123', isChecked: true }],
      headers: [{ key: 'Content-Type', value: 'application/json', isChecked: true }],
      id: '',
      body: '',
      variables: [],
      date: '',
    };

    const base64url = btoa(req.url);
    const param = createQueryString(req.params);
    const base64param = param && btoa(`?${param}`);
    const headers = createQueryString(req.headers);
    const headerQuery = headers && `?${headers}`;

    const expectedUrl = `/${req.method}/${base64url}${base64param}${headerQuery}`;

    expect(generateUrl(req)).toBe(expectedUrl);
  });
});
