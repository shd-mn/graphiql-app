import { Method } from '@/types';

export const methods: { name: Method; color: string }[] = [
  { name: 'GET', color: 'text-green-500' },
  { name: 'POST', color: 'text-yellow-500' },
  { name: 'PUT', color: 'text-blue-500' },
  { name: 'PATCH', color: 'text-purple-500' },
  { name: 'DELETE', color: 'text-red-500' },
  { name: 'HEAD', color: 'text-green-700' },
  { name: 'OPTIONS', color: 'text-pink-500' },
];
