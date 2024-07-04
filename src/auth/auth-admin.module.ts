import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { JWTAdminStrategy } from './strategies/jwt-admin.strategy';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/app-public/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.sessionExpires'),
        },
      }),
    }),
  ],
  controllers: [AuthAdminController],
  providers: [IsExist, IsNotExist, AuthAdminService, JWTAdminStrategy],
  exports: [AuthAdminService],
})
export class AuthAdminModule {}
