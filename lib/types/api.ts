export type ApiResponse<T> =
  | { ok: true; data: T; message?: string }
  | { ok: false; error: string; issues?: Record<string, string[] | undefined> };

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
