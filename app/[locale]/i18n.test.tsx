import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import middleware from '../../middleware';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('i18n routing', () => {
  it('redirects to default locale', async () => {
    const req = new NextRequest(new URL('http://localhost/'));
    const res = middleware(req);
    expect(res?.status).toBe(307);
    expect(res?.headers.get('Location')).toBe('http://localhost/en');
  });

  it('remembers the last locale', async () => {
    const req = new NextRequest(new URL('http://localhost/'));
    req.cookies.set('NEXT_LOCALE', 'ru');
    const res = middleware(req);
    expect(res?.status).toBe(307);
    expect(res?.headers.get('Location')).toBe('http://localhost/ru');
  });
});
