import Order from './Order';
import { FindQueryDTOParams } from './FindQueryDTOParams';

export default class FindQueryDTO<T=object> {
  private _criteria?: T;
  private _order?: Order;

  constructor(params: FindQueryDTOParams<T>) {
    console.log('FindQueryDTO', params.order, params.criteria);
    this._criteria = params.criteria;
    this._order = params.order;
  }

  public get criteria(): T | undefined {
    return this._criteria;
  }

  public get order(): Order | undefined {
    return this._order;
  }
}