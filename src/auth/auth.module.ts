import { Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth.middleware';
import { RolesGuard } from 'src/roles.guard';

@Module({
  imports: [
    /* ... */
  ],
  providers: [AuthMiddleware, RolesGuard],
})
export class AuthModule { }
