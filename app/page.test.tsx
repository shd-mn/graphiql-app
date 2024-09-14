import { describe, it, expect, vi } from 'vitest';
import RootPage from './page';
import { redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('RootPage component', () => {
  it('should call redirect with "/en"', () => {
    RootPage();

    expect(redirect).toHaveBeenCalledWith('/en');
  });
});
