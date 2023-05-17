import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exception.filter';

@Controller()
@UseFilters(AllExceptionsFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-all-exceptions-filter')
  getThrow(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
