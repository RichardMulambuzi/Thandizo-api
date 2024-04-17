import { Request, Response, NextFunction } from 'express';
import {
  UnauthorizedException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { ThandizoRoles } from './auth/roles.enum';
import { verify } from 'jsonwebtoken';
import { StaffService } from './staff/staff.service';
import { ThandizoUser } from './shared/User.staff.entity';
// Custom interface extending the Request interface to include the 'user' property
interface CustomRequest extends Request {
  user?: ThandizoUser; // Assuming User is the type of your entity
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly staffService: StaffService) { }

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      console.log('AuthMiddleware: Starting authentication process');

      const accessToken = req.cookies['accessToken'];

      if (!accessToken) {
        console.log('AuthMiddleware: Access token is missing');
        throw new UnauthorizedException('Access token is missing');
      }

      console.log('AuthMiddleware: Verifying access token');
      const payload: any = verify(accessToken, 'access_secret');

      if (!payload) {
        console.log('AuthMiddleware: Invalid access token');
        throw new UnauthorizedException('Invalid access token');
      }

      console.log('AuthMiddleware: Retrieving user from database');
      const user = await this.staffService.findStaffById(payload.id);

      if (!user) {
        console.log('AuthMiddleware: User not found');
        throw new UnauthorizedException('User not found');
      }

      console.log('AuthMiddleware: Attaching user to request object');
      req.user = user;

      console.log(req.user);
      const loggedInUser = user;

      console.log('AuthMiddleware: Checking user permissions');
      if (!loggedInUser.roles.includes(ThandizoRoles.ADMIN)) {
        console.log(
          'AuthMiddleware: User does not have permission to access this resource',
        );
        throw new ForbiddenException(
          'User does not have permission to access this resource',
        );
      }

      console.log(
        'AuthMiddleware: Authentication successful, proceeding to next middleware',
      );
      next();
    } catch (error) {
      console.error('AuthMiddleware: Authentication error:', error.message);
      next(error);
    }
  }
}
