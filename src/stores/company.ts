import { defineStore } from 'pinia';
import { Pagination } from 'src/models';

export const useCompanyStore = defineStore('useCompanyStore', {
  state: (): {
    company_pagination: Pagination;
    filter: {
      input?: string;
    };
  } => ({
    company_pagination: {
      descending: true,
      page: 1,
      sortBy: 'id',
      rowsNumber: 1,
      rowsPerPage: 50,
    },
    filter: {
      input: '',
    },
  }),
});
