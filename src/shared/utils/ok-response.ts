import { HttpStatus } from '@nestjs/common';

export type TOkResponse<T> = {
  status_code: number;
  data: T;
  message: string;
};

export const OkTransform = <T>(
  data: T,
  message = 'Success',
  status_code: number = HttpStatus.OK,
): TOkResponse<T> => {
  return {
    status_code,
    data,
    message,
  };
};
