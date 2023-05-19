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
  ImATeapotException,
  UseFilters,
  UsePipes,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { of, Observable } from 'rxjs';
// import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat, createCatSchema } from './interfaces/cat.interface';
import { CustomForbiddenException } from '../exceptions/customForbidden.exception';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { JoiValidationPipe } from '../pipes/joiValidation.pipe';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) //exception filters can be method scoped (use decorator above method), controller scoped (use decorator above class), or global scope (add in main.ts)
export class CatsController {
  constructor(private catsService: CatsService) {} //

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
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

  @Get('query')
  async findOneQuery(@Query('id', ParseIntPipe) id: string) {
    return `This action returns a #${id} cat`;
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
  async testTeapot() {
    throw new ImATeapotException();
  }

  @Get(':id')
  //by passing a class, we leave responsibility for instantiation to the framework and also enable dependency injection
  // findOne(@Param('id', ParseIntPipe) id: string): string {
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    ) //passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options
    id: string,
  ): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
