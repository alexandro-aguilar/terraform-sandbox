export default interface PaginationResponseDTO<T> {
  pageNumber: number,
  pageSize: number,

  lastPage: number,

  totalItems: number,
  from: number,
  to: number,
    
  items: T
}