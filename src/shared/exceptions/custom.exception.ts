import { HttpException } from '@nestjs/common';

export class CustomStatusException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
