import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GlobalMiddleware } from './common/global.middleware';
import { globalFunctionalMiddleware } from './common/globalFunctional.middleware';
// import { ValidationPipe } from './pipes/validation.pipe';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   *  NO! Class middleware not possible here because no access to DI container - only functional middlewares
   *  If we want to use a class middleware globally, we need to use it within the AppModule or any other module
   *  and consume it with the forRoutes('*') method with a wildcard symbol as the argument
   */
  // app.use(GlobalMiddleware);
  app.use(globalFunctionalMiddleware);
  /** Register a generic global validation pipe used across the whole application for every controller and every route handler.
   * In case of hybrid apps, useGlobalPipes method doesn't set up pipes for gateways and microservices.
   * For "standard" (non-hybrid) microservice apps, useGlobalPipes does mount pipes globally.
   * In terms of dependency injection, global pipes registered outside of any module (such as in this case) cannot inject dependencies
   * since the binding has been done outside the context of any module.
   */
  // app.useGlobalPipes(new ValidationPipe()); //we can set this up directly from within any module for DI
  /**
   * Register a generic global guard across the whole application for every controller and every route handler.
   * Global guards registered from outside a module cannot inject dependencies since this is done outside the context of any module.
   * In order to solve this issue, we can set up a guard directly in any module.
   */
  // app.useGlobalGuards(new RolesGuard());
  /**
   * Register a generic global interceptor across the whole application for every controller and route handler.
   * Global interceptors registered from outside a module cannot inject dependencies since this is done outside the context of any module.
   * In order to solve this issue, we can set up an interceptor directly in any module.
   */
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
