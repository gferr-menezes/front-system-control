import { api } from 'src/boot/axios';
import { InputApiPaginationInterface, OutputApiPaginationInterface, OutputContact } from 'src/models';

export enum TYPE_COMPANY {
  PROPERTY_DEVELOPER = 'property developer',
  REAL_STATE = 'real state',
}

export enum OCCUPATION_AREA {
  RESIDENTIAL = 'residential',
  INDUSTRIAL = 'industrial',
}

export interface InputContact {
  id?: number;
  phone: string;
  email?: string;
  address?: string;
  address_number?: string;
  address_complement?: string;
  neighborhood?: string;
  zip_code?: string;
  city?: string;
  state?: string;
  company_id?: number;
  client_id?: number;
}

export interface InputCompany {
  id?: number;
  corporate_name: string;
  fantasy_name?: string;
  cnpj: string;
  type_company: TYPE_COMPANY;
  occupation_area: OCCUPATION_AREA;
  gericada: boolean;
  contacts: Array<InputContact>;
}

export interface OutputCompany {
  id: number;
  corporate_name: string;
  fantasy_name: string;
  cnpj: string;
  type_company: string;
  occupation_area: string;
  gericada: boolean;
  created_at: Date;
  updated_at: Date;
  contacts: Array<OutputContact>;
}

export interface FilterCompany {
  input: string;
}

export class CompanyService {
  protected readonly endpoint = 'company';

  /**
   * @param company
   * @returns
   */
  async create(company: InputCompany): Promise<InputCompany> {
    const response = await api.post(`${this.endpoint}`, company);
    return response?.data ?? [];
  }

  /**
   * @param filter
   * @param pagination
   * @returns
   */
  async getAll(filter?: FilterCompany, pagination?: InputApiPaginationInterface): Promise<OutputApiPaginationInterface<OutputCompany>> {
    const query_params: {
      filter: {
        input?: string;
      };
      pagination?: InputApiPaginationInterface;
    } = {
      filter: {
        input: '',
      },
    };

    if (filter) {
      query_params.filter.input = filter?.input ?? '';

      if (!filter.input) {
        delete query_params.filter.input;
      }
    }

    if (pagination) {
      query_params.pagination = {
        page: pagination.page,
        per_page: pagination.per_page,
        sort_by: pagination.sort_by,
        sort_order: pagination.sort_order,
      };
    }

    console.log(query_params.filter);

    const response = await api.get(this.endpoint, {
      params: {
        filter: JSON.stringify(query_params.filter),
        pagination: query_params.pagination
          ? JSON.stringify(query_params.pagination)
          : JSON.stringify({
              page: 1,
              per_page: 50,
              sort_by: 'id',
              sort_order: 'desc',
            }),
      },
    });

    return response.data;
  }

  /**
   * @param id
   * @returns
   */
  async findById(id: number): Promise<OutputCompany> {
    const response = await api.get(`${this.endpoint}/${id}`);
    return response?.data ?? [];
  }

  async update(id: number, company: InputCompany): Promise<InputCompany> {
    const response = await api.put(`${this.endpoint}/${id}`, company);
    return response?.data ?? [];
  }
}
