import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { CacheService } from 'src/core/cache/cache.service';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { ConfigType } from '@nestjs/config';
import { compare } from 'bcrypt';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { Admin } from 'src/entities/admin.entity';
import { LoginResponseType } from 'src/types/auth/login-response.type';
import { formatString } from 'src/shared/utils/string';
import authConfig from 'src/shared/config/auth.config';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import { AdminService } from 'src/app-public/admin/admin.service';
import { NullableType } from 'src/types/nullable.type';

@Injectable()
export class AuthAdminService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    private adminService: AdminService,
    private cacheService: CacheService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType<Admin>> {
    const user = await this.adminService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new ErrorException(
        {
          email: 'notFound',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new ErrorException(
        {
          password: 'incorrectPassword',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      access: 'admin',
    });

    await this.cacheService.set(
      formatString(CACHE_KEY_AUTH.SESSION, user.id),
      true,
      parseTimeToSeconds(this.config.sessionExpires ?? '1h'),
    );

    return { token, user };
  }

  async me(id: string): Promise<NullableType<Admin>> {
    return this.adminService.findOne({
      id,
    });
  }

  async logout(token: string): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, token));
  }
}
