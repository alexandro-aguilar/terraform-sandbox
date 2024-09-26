export default class PaginationMapperParams<T> {
  _pageNumber: number;
  _size: number;
  _total: number;
  _items: T;

  constructor(pageNumber: number, size: number, total: number, items: T) {
    this._pageNumber = pageNumber;
    this._size = size;
    this._total = total;
    this._items = items;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  get size(): number {
    return this._size;
  }

  get total(): number {
    return this._total;
  }

  get items(): T {
    return this._items;
  }
}