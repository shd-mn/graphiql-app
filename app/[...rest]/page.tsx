import RestForm from '@/components/RestClient/Form';

import ResponseSection from '@/components/RestClient/ResponseSection';
import { fetchData } from './actions/fetchData';

type PropsType = {
  params: {
    rest: string[];
  };
  searchParams: {
    key: string;
    value: string;
  };
};

export default async function RESTfull({ params, searchParams }: PropsType) {
  const headers = searchParams;
  const [method, ...url] = params.rest;

  const urlDecodedData = decodeURIComponent(url.join('/'));

  const convertedUrl = atob(urlDecodedData);

  const response = await fetchData(convertedUrl, method, headers);

  const data = await response?.json();

  const stringfy = JSON.stringify(data, null, 1);
  return (
    <main className="h-[calc(100vh-8.5rem)]">
      <RestForm />
      <ResponseSection data={stringfy} />
    </main>
  );
}
