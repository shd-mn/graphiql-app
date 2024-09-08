import { RequestType } from '@/types';
import { createQueryString } from './createQueryString';

export function generateUrl(req: RequestType): string {
  const base64url = btoa(req.url);
  const param = createQueryString(req.params);
  const base64param = param && btoa(`?${param}`);

  const body = req.body && JSON.stringify(req.body);
  const base64body = body && `/${btoa(body)}`;

  const headers = createQueryString(req.headers);
  const headerQuery = headers && `?${headers}`;

  return `/${req.method}/${base64url}${base64param}${base64body}${headerQuery}`;
}
