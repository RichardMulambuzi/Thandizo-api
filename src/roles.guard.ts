import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ThandizoRoles } from 'src/auth/roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { ThandizoUser } from './shared/User.staff.entity';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    console.log('RolesGuard: Starting authorization process');

    const requiredRoles = this.reflector.get<ThandizoRoles[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('RolesGuard: No roles specified, denying access.');
      return true;
    }

    console.log('RolesGuard: Retrieving authenticated user');
    const user: ThandizoUser = this.getUser(context);
    console.log(user);
    if (!user || !user.roles) {
      console.log('RolesGuard: User not authenticated, denying access.');
      throw new UnauthorizedException('User is not logged in or has no roles');
    }

    console.log('RolesGuard: Checking user roles against required roles');

    try {
      if (user.roles.includes(ThandizoRoles.ADMIN)) {
        console.log('RolesGuard: User is an admin, granting full access.');
        return true;
      } else if (user.roles.includes(ThandizoRoles.USER)) {
        console.log(
          'RolesGuard: User has logged in, checking CRUD permissions on LPH staff.',
        );
        return this.hasAllRequiredRoles(requiredRoles, ThandizoRoles.USER);
      } else {
        console.log('RolesGuard: User role is not authorized for this action.');
        throw new ForbiddenException(
          'User role is not authorized for this action',
        );
      }
    } catch (error) {
      console.error('RolesGuard: Authorization error:', error);
      throw error; // Re-throw the error for appropriate handling
    }
  }

  private getUser(context: ExecutionContext) {
    return context.switchToHttp().getRequest().user;
  }

  private isRestrictedEndpoint(context: ExecutionContext): boolean {
    const requestedEndpoint = context.switchToHttp().getRequest().url;
    const restrictedEndpoints = [
      '/count-all-staff',
      '/register-staff',
      '/delete-staff/:id',
      '/update-staff/:id',
      '/view-staff/:id',
      '/view-all-staff',
    ];
    return restrictedEndpoints.includes(requestedEndpoint);
  }

  private hasAllRequiredRoles(
    requiredRoles: ThandizoRoles[],
    ...allowedRoles: ThandizoRoles[]
  ): boolean {
    return requiredRoles.every((role) => allowedRoles.includes(role));
  }

  private hasAnyRequiredRole(
    requiredRoles: ThandizoRoles[],
    ...allowedRoles: ThandizoRoles[]
  ): boolean {
    return requiredRoles.some((role) => allowedRoles.includes(role));
  }
}
