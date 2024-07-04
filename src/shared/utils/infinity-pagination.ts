import { InfinityPaginationResultType } from 'src/types/infinity-pagination-result.type';
import { IPaginationOptions } from 'src/types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
