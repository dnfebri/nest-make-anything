import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { OkTransform, TOkResponse } from 'src/utils/ok-response';
import { Admin } from 'src/entities/admin.entity';

@ApiTags('Auth Admin')
@Controller({
  path: '/auth/admin',
  version: '1',
})
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<TOkResponse<Admin>> {
    return OkTransform(await this.authAdminService.validateLogin(loginDto));
  }
}
