export interface ApiResponse<T> {
  status: number;
  message: string;
  body?: T;
}

export interface IPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedApiResponse<T> {
  status: number;
  message: string;
  body: {
    data: T;
    pagination: IPagination;
  };
}
