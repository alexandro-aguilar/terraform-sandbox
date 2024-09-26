import Order from './Order';

export type PaginationQueryDTOParams<T> = {
  criteria?: T;
  order?: Order;
  pageNumber?: number | string;
  size?: number | string;
}