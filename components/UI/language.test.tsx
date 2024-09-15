import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';
import { customRender } from '@/__test__/test-utils';
import { ReactNode } from 'react';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: vi.fn().mockReturnValue('/'),
  routing: {
    locales: ['en', 'ru'],
  },
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useLocale: vi.fn().mockReturnValue('en'),
}));

describe('LanguageSwitcher component', () => {
  it('should render the correct locales and handle language change', async () => {
    customRender(<LanguageSwitcher />);

    const selectElement = screen.getByRole('combobox');

    expect(selectElement.innerText).toBe('en');

    expect(screen.getByText('en')).toBeInTheDocument();

    fireEvent.mouseDown(selectElement);
    expect(screen.getByText('ru')).toBeInTheDocument();

    const menuItem = screen.getByRole('option', { name: /ru/i });
    fireEvent.click(menuItem);
  });
});
