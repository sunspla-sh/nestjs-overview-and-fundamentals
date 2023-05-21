import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { CacheInterceptor } from './interceptors/cache.interceptor';
// import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

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

  @Get('cache')
  @UseInterceptors(CacheInterceptor)
  getCache(): string[] {
    return ['not from the cache'];
  }
}
