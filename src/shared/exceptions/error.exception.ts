import { HttpException } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(errors: Record<string, string>, status_code = 400) {
    super(
      {
        status_code,
        message: 'Validation Error',
        errors,
      },
      status_code,
    );
  }
}
