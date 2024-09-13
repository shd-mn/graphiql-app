import { useLocale, useTranslations } from 'next-intl';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations('Language');
  const locale = useLocale();

  function handleLangChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select
      labelId="language-select-label"
      id="language-select"
      className="uppercase text-white"
      autoWidth
      size="small"
      label={t('label')}
      defaultValue={locale}
      disabled={isPending}
      onChange={handleLangChange}
    >
      {routing.locales.map((cur) => (
        <MenuItem key={cur} value={cur} className="font-medium uppercase">
          {cur}
        </MenuItem>
      ))}
    </Select>
  );
}
