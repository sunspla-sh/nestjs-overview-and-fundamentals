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

/**
 * There is no place for the middleware in the @Module() decorator. Instead, we set them up using the configure() method of the module class.
 * Modules that include middleware must implement the NestModule interface.
 */

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
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
