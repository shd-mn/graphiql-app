import { textToBase64 } from '@/utils/coderBase64';
import { getFilteredQuery } from '@/utils/getiFlteredQuery';
import { routes } from '@/constants/routes';
import { GQLHeader } from '@/redux/features/graphiqlSlice';

export function stringFromHeaders(headers: GQLHeader[]) {
  return headers.length ? '?' + headers.map((header) => `${header.key}=${header.value}`).join('&') : '';
}

export function setBrowserUrl(url: string, query: string, headers: GQLHeader[]) {
  const encodedBody = textToBase64(JSON.stringify(getFilteredQuery(query)));
  const encodedUrl = textToBase64(url);
  const headersForUrl = stringFromHeaders(headers);
  return `${routes.graphql}/${encodedUrl}/${encodedBody}${headersForUrl}`;
}
