import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    super('Custom Forbidden', HttpStatus.FORBIDDEN);
  }
}
