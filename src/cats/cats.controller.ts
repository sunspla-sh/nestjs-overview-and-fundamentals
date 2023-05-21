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
  ParseBoolPipe,
  Query,
  DefaultValuePipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { of, Observable } from 'rxjs';
// import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat, createCatSchema } from './interfaces/cat.interface';
import { CustomForbiddenException } from '../exceptions/customForbidden.exception';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';
// import { JoiValidationPipe } from '../pipes/joiValidation.pipe';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
// import { AuthGuard } from 'src/guards/auth.guard';
// import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude-null.interceptor';
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) //exception filters can be method scoped (use decorator above method), controller scoped (use decorator above class), or global scope (add in main.ts)
// @UseGuards(AuthGuard)
// @UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {} //

  @Post()
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  // @UsePipes(new JoiValidationPipe(createCatSchema)) //we can use our validation pipes at the method level
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) { //or we can use our validation pipes at the parameter level
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
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('query')
  async findOneQuery(@Query('id', ParseIntPipe) id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get('page')
  findAllPage(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): string {
    return `The activeOnly status is ${activeOnly} and the page is ${page}.`;
  }

  @Get('null')
  @UseInterceptors(ExcludeNullInterceptor)
  findNull(): null {
    return null;
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

  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  async getTimeout(): Promise<string> {
    await new Promise((res, rej) => setTimeout(() => res(''), 6000));
    return 'no timeout';
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
