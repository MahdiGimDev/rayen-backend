import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TypeProvider, UserRoles } from '../models/role.mode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!roles || user.role == UserRoles.ADMIN) {
      return true;
    }
    return roles.indexOf(user.role) >= 0;
  }

  canActivateType(context: ExecutionContext): boolean {
    const typepr = this.reflector.get<string[]>('typep', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!typepr || user.typep == TypeProvider.PHYSIQUE) {
      return true;
    }
    return typepr.indexOf(user.role) >= 0;
  }

}
