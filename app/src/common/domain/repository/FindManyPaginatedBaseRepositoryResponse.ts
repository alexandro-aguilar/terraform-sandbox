export default class FindManyPaginatedBaseRepositoryResponse<T> {
  constructor(
    private readonly _items: Array<T>,
    private readonly _count: number,
  ) {}
  
  get items(): Array<T> {
    return this._items;
  }

  get count(): number {
    return this._count;
  }
}