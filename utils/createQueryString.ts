import type { Param } from '@/types';

export const createQueryString = (query: Param[] | undefined) => {
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
