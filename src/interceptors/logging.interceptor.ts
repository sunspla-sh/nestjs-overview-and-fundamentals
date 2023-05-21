import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptors can be used to implement custom logic both before and after the execution of the final route handler.
 * Additionally, interceptors must call the handle() method otherwise the router handler method will not be triggered.
 * This is similar to how middlewares must call the next() function to pass control on to the next middleware in the stack otherwise the response hangs.
 * Interceptors can be controller-scoped, method-scoped, or global-scoped.
 */

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before (interceptor)...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After (interceptor)... ${Date.now() - now}ms`)),
      );
  }
}
