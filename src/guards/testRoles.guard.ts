import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TestRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user || { roles: ['admin'] }; //testing out roles here with a simple "roles" object because we don't have a user object yet
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(roles: string[], userRoles: string[]): boolean {
  console.log('checking user roles...');
  return roles.every((role: string) => {
    console.log(
      'checking if user roles includes the following guard role: ' + role,
    );
    return userRoles.includes(role);
  });
}
