import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/app-public/admin/admin.service';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
// import { LoginResponseType } from 'src/types/auth/login-response.type';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AuthAdminService {
  constructor(private readonly adminService: AdminService) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<Admin> {
    const admin = await this.adminService.findOne({
      email: loginDto.email,
    });
    return admin;
  }
}
