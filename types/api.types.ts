export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface ApiRequest {
  id: string;
  method: HttpMethod;
  url: string;
  params: RequestParam[];
  headers: RequestParam[];
  body: string;
  variables: RequestParam[];
  date: string;
  sdl?: string;
}

export interface ApiResponse {
  data: string;
  status: number;
  statusText: string;
  parsedHeaders: {
    [key: string]: string;
  };
  success: boolean;
  responseTime: number;
}

export interface RequestParam {
  isChecked: boolean;
  key: string;
  value: string;
}
