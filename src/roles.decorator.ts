import { SetMetadata } from '@nestjs/common';
import { ThandizoRoles } from './auth/roles.enum';

export const ROLES_KEY = 'roles'; // Define the constant for clarity

export const Roles = (...roles: ThandizoRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
