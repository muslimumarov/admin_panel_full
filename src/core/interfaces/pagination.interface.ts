export interface PaginationInterface<TData> {
  data: TData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
