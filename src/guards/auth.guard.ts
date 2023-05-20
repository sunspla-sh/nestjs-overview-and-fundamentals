import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Guards are executed after all middleware and before any interceptor or pipe
 */

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Every guard must implement a canActivate function, which should return a boolean indicating whether the current request is allowed or not.
   * It can return the response either synchronously or asynchronously (via a Promise or Observable)
   * @param context: ExecutionContext
   * @returns boolean | Promise<boolean> | Observable<boolean>
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(request: any) {
  return true;
}
