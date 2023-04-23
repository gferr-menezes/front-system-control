import { Pagination } from '../models';

const rows_per_page_options = [20, 50, 100, 150];

const pagination_data: Pagination = {
  descending: false,
  page: 1,
  sortBy: 'id',
  rowsPerPage: 50,
  rowsNumber: 1,
};

export { rows_per_page_options, pagination_data };
