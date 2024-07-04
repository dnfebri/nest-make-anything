import { Module } from '@nestjs/common';
import { AuthAdminModule } from './auth-admin.module';

@Module({
  imports: [AuthAdminModule],
})
export class AuthModule {}
