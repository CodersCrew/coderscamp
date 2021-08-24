import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Role } from '@coderscamp/shared/models/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const handlerRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    const classRoles = this.reflector.get<Role[]>('roles', context.getClass());

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!handlerRoles && !classRoles) return true;

    if (!handlerRoles) return classRoles.includes(user.role);

    return handlerRoles.includes(user.role);
  }
}

export const ForAll = () => SetMetadata('roles', Object.keys(Role));

export const ForAdmin = () => SetMetadata('roles', [Role.Admin]);
