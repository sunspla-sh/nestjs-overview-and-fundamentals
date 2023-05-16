import {
  Controller,
  Get,
  Post,
  Redirect,
  Param,
  // Req,
  Body,
  HttpException,
  HttpStatus,
  ImATeapotException
} from '@nestjs/common';
import { of, Observable } from 'rxjs';
// import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CustomForbiddenException } from '../exceptions/customForbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {} //

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    // it is preferable to use classes as data transfer objects over typescript interfaces
    // because the classes exist in the final transpiled javascript and can be used
    // to whitelist properties with the ValidationPipe and automatically strip
    // non-whitelisted properties or even end the request with an error if
    // non-whitelisted properties are detected
    this.catsService.create(createCatDto);
  }

  // @Get()
  // findAll(@Req() request: Request): string {
  //   return 'This action returns all cats and the request ip: ' + request.ip;
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('neoncats')
  @Redirect('http://localhost:3000/cats', 301)
  neoncats(): void {
    return;
  }

  @Get('cat-promise')
  async findAllPromise(): Promise<any[]> {
    return [];
  }

  @Get('cat-observable')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }

  @Get('cat-error')
  async testError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('cat-custom-forbidden')
  async testForbidden() {
    throw new CustomForbiddenException();
  }

  @Get('teapot')
  async testTeapot(){
    throw new ImATeapotException();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
