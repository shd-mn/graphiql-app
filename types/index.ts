export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface RequestType {
  id: string;
  method: Method;
  url: string;
  params: Param[];
  headers: Param[];
  body: string;
  variables: Param[];
  date: string;
  sdl?: string;
}

export interface ResponseType {
  data: string;
  status: number;
  statusText: string;
  parsedHeaders: {
    [k: string]: string;
  };
  success: boolean;
  responseTime: number;
}

export interface Param {
  isChecked: boolean;
  key: string;
  value: string;
}

export interface DataTableType {
  id: string;
  method: string;
  url: string;
  date: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof DataTableType;
  label: string;
  numeric: boolean;
}

export type Order = 'asc' | 'desc';
