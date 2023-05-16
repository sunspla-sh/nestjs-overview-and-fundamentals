import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GlobalMiddleware } from './common/global.middleware';
import { globalFunctionalMiddleware } from './common/globalFunctional.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   *  NO! Class middleware not possible here because no access to DI container - only functional middlewares
   *  If we want to use a class middleware globally, we need to use it within the AppModule or any other module
   *  and consume it with the forRoutes('*') method with a wildcard symbol as the argument
   */
  // app.use(GlobalMiddleware);
  app.use(globalFunctionalMiddleware);
  await app.listen(3000);
}
bootstrap();
