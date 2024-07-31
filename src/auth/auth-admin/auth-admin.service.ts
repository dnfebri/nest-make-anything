import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminService } from 'src/app-public/admin/admin.service';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
// import { LoginResponseType } from 'src/types/auth/login-response.type';
import { Admin } from 'src/entities/admin.entity';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { compare } from 'bcrypt';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; admin: Admin }> {
    const admin = await this.adminService.findOne({
      email: loginDto.email,
    });

    if (!admin) {
      throw new ErrorException(
        {
          email: 'notFound',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidPassword = await compare(loginDto.password, admin.password);
    if (!isValidPassword) {
      throw new ErrorException(
        {
          password: 'incorrectPassword',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    // console.log(this.configService.get('auth', { infer: true }));
    const token = this.jwtService.sign({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      access: 'admin',
    });

    return { token, admin };
  }
}
