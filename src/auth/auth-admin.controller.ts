import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  SerializeOptions,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { Admin } from 'src/entities/admin.entity';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { OkTransform, TOkResponse } from 'src/utils/ok-response';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { NullableType } from 'src/types/nullable.type';

@ApiTags('Auth Admin')
@Controller({
  path: '/auth/admin',
  version: '1',
})
export class AuthAdminController {
  constructor(private readonly service: AuthAdminService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<TOkResponse<Readonly<{ token: string; user: Admin }>>> {
    return OkTransform(await this.service.validateLogin(loginDto));
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('/me')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async admin(
    @SessionUser() user: Admin,
  ): Promise<TOkResponse<NullableType<Admin>>> {
    return OkTransform(await this.service.me(user.id));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: Admin): Promise<TOkResponse<void>> {
    return OkTransform(await this.service.logout(user.id));
  }
}
