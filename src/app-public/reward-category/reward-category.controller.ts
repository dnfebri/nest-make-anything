import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RewardCategoryService } from './reward-category.service';
import { RewardCategory } from '../../entities/reward-category.entity';
import { CreateRewardCategoryDto } from './dto/crete-rewardCategory.dto';
import { PaginationResultType } from 'src/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { OkTransform, TOkResponse } from 'src/shared/utils/ok-response';
import { NullableType } from 'src/types/nullable.type';
import { ApiQuery } from '@nestjs/swagger';

@Controller({ path: 'reward-category', version: '1' })
export class RewardCategoryController {
  constructor(private readonly rewardCategoryService: RewardCategoryService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginationResultType<RewardCategory>> {
    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;
    const [data, total] = await this.rewardCategoryService.findMany();
    return customPagination(data, total, { page, limit });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Body() createRewardCategoryDto: CreateRewardCategoryDto,
  ): Promise<TOkResponse<RewardCategory>> {
    return OkTransform(
      await this.rewardCategoryService.create(createRewardCategoryDto),
      'Category created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<NullableType<RewardCategory>> {
    return await this.rewardCategoryService.findById(id);
  }
}
