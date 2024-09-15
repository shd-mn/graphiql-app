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
