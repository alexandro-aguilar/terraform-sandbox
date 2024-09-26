import Order from './Order';

export type FindQueryDTOParams<T> = {
  criteria?: T;
  order?: Order;
}