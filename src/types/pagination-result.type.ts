type metadata = {
  total: number;
  per_page: number;
  total_pages: number;
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
};

export type PaginationResultType<T> = Readonly<{
  data: T[];
  metadata: metadata;
}>;
