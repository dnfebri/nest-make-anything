import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from './validate-config';
import { AuthConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_SESSION_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_OTP_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.AUTH_JWT_SECRET,
    tokenExpires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
    sessionExpires: process.env.AUTH_SESSION_TOKEN_EXPIRES_IN,
    otpExpires: Number(process.env.AUTH_OTP_TOKEN_EXPIRES_IN),
  };
});
