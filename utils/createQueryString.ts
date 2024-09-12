import type { RequestParam } from '@/types/api.types';

export const createQueryString = (query: RequestParam[] | undefined) => {
  if (!query) return '';
  const queryString = query
    .map((item) => {
      if (item.isChecked && item.key && item.value) {
        return `${item.key}=${encodeURIComponent(item.value)}`;
      }
      return null;
    })
    .filter(Boolean)
    .join('&');

  return queryString;
};
