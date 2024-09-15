'use server';

import { getErrorMessage } from '@/utils/getErrorMessage';

const ignoredBodyMethods = ['GET', 'HEAD'];

export async function fetcher(url: string | URL | Request, options?: RequestInit) {
  try {
    const startTimer = Date.now();

    const body = options?.body && !ignoredBodyMethods.includes(options.method || '') ? options.body : undefined;

    const res = await fetch(url, {
      ...options,
      body,
    });

    const contentType = res.headers.get('Content-Type') || '';

    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else if (contentType.includes('text/plain')) {
      data = await res.text();
    } else if (contentType.includes('text/html')) {
      data = await res.text();
    } else {
      data = await res.blob();
    }

    const endTimer = Date.now();

    return {
      data: typeof data === 'object' ? JSON.stringify(data, null, 2) : data,
      status: res.status,
      statusText: res.statusText,
      parsedHeaders: Object.fromEntries(res.headers),
      success: res.ok,
      responseTime: endTimer - startTimer,
    };
  } catch (error) {
    return {
      data: JSON.stringify(error),
      status: 0,
      statusText: getErrorMessage(error, 'Error: Failed to fetch'),
      parsedHeaders: {},
      success: false,
      responseTime: 0,
    };
  }
}
