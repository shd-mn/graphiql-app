import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ru'],

  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/en',
      ru: '/ru',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
