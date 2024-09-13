import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as 'en' | 'ru')) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
