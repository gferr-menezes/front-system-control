export type SelectBoxInterface = {
  value: any;
  label: string;
  inactive?: boolean;
  data_object?: any;
};

export type Pagination = {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;

  // page: number;
  // total: number;
  // per_page: number;
  // sortBy: string;
  // descending?: boolean;
  // rowsPerPage: number;
  // rowsNumber: number;
};

export interface OutputApiPaginationInterface<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
}

export interface InputApiPaginationInterface {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OutputContact {
  id: number;
  phone: string;
  email?: string | null;
  address?: string | null;
  address_number?: string | null;
  address_complement?: string | null;
  neighborhood?: string | null;
  zip_code?: string | null;
  city?: string | null;
  state?: string | null;
  created_at: Date;
  updated_at: Date;
  company_id?: number | null;
  client_id?: number | null;
}
