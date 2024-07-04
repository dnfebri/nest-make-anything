import { AuthGuard } from '@nestjs/passport';

export const AuthUserGuard = AuthGuard('user');
export const AuthAdminGuard = AuthGuard('admin');
