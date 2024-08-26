import { QueryParam } from '@/constants/restClientData';

export const createQueryString = (query: QueryParam[] | undefined) => {
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

  return `?${queryString}`;
};
