type RequestOptions = {
  method: string;
  headers: object;
  body?: string;
};
export async function fetchData(url: string, method = 'GET', headers = {}, body = {}) {
  try {
    const options: RequestOptions = {
      method: method,
      headers: headers,
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
