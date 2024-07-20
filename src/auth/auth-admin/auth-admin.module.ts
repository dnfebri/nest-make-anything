import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AdminModule } from 'src/app-public/admin/admin.module';

@Module({
  imports: [AdminModule],
  providers: [AuthAdminService],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
