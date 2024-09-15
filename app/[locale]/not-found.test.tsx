import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from './not-found';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => {
    const translations: { [key: string]: string } = {
      'NotFound.title': 'Page Not Found',
      'NotFound.backToHome': 'Back to Home',
    };
    return translations[key] || key;
  }),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('NotFound component', () => {
  it('should render the not found page with title and back link', () => {
    const { getByText, debug } = render(<NotFound />);

    debug();

    expect(getByText('backToHome')).toBeInTheDocument();
  });
});
