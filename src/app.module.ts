import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { loggerFunctionalMiddleware } from './common/loggerFunctional.middleware';
import { CatsController } from './cats/cats.controller';

import { ValidationPipe } from './pipes/validation.pipe';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './guards/roles.guard';
import { TestRolesGuard } from './guards/testRoles.guard';

/**
 * There is no place for the middleware in the @Module() decorator. Instead, we set them up using the configure() method of the module class.
 * Modules that include middleware must implement the NestModule interface.
 */

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: TestRolesGuard,
    },
    {
      provide: APP_PIPE, //when using this approach, the pipe is infact global no matter which module we use to register it
      useClass: ValidationPipe, //so it is best to choose to register it in the module in which the pipe is defined
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * The forRoutes method can a single string, multiple strings, a RouteInfo object, a controller class, or even multiple controller classes.
     * The apply method may similarly take a single middleware or multiple middlewares.
     * The exclude method can be used to exclude routes with similar arguments to the forRoutes method.
     */
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'cats/neoncats', method: RequestMethod.GET })
    //   .forRoutes(CatsController);
    consumer
      .apply(loggerFunctionalMiddleware, LoggerMiddleware)
      .exclude({ path: 'cats/neoncats', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}
