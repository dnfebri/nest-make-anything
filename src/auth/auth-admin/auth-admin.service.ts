import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AdminService } from 'src/app-public/admin/admin.service';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { Admin } from 'src/entities/admin.entity';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/core/cache/cache.service';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { formatString } from 'src/shared/utils/string';
import authConfig from 'src/shared/config/auth.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import { AllConfigType } from 'src/shared/config/config.type';

@Injectable()
export class AuthAdminService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
    private cacheService: CacheService,
    private configService: ConfigService<AllConfigType>,
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

    const token = this.jwtService.sign({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      access: 'admin',
    });

    await this.cacheService.set(
      formatString(CACHE_KEY_AUTH.SESSION, admin.id + 'admin'),
      'true',
      parseTimeToSeconds(this.config.sessionExpires ?? '1h'),
    );

    return { token, admin };
  }
}
