import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Admin } from '../../entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InfinityPaginationResultType } from 'src/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/shared/utils/infinity-pagination';
import { NullableType } from 'src/types/nullable.type';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: '/backoffice/admins',
  version: '1',
})
export class AdminController {
  constructor(private adminService: AdminService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Admin>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.adminService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin', 'admin'],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/search/:name')
  async fillterByName(
    @Param('name') name: string,
  ): Promise<NullableType<Admin[]>> {
    return await this.adminService.fillterAdminByName(name);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findBy(@Param('id') id: string): Promise<NullableType<Admin>> {
    return await this.adminService.findOne({ id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.adminService.delete(id);
  }
}
