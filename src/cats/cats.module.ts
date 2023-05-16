import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

/*
  Every module is automatically a shared module
  once created, it can be reused by any module.
  Modules are not global by default. Nest encapsulates providers in the module scope.
  We aren't able to use a module's providers elsewhere without first importing the encapsulating module.
  If we want a set of providers to be available everywhere (helpers, database connections, etc.), we can
  make the module global with the @Global decorator.
*/
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //by adding the CatsService provider to the exports array, we can share the instance between other modules
})
export class CatsModule {}
