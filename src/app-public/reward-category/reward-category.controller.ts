import { Body, Controller, Get, Post } from '@nestjs/common';
import { RewardCategoryService } from './reward-category.service';
import { RewardCategory } from 'src/entities/reward-category.entity';
import { CreateRewardCategoryDto } from './dto/crete-rewardCategory.dto';

@Controller({ path: 'reward-category', version: '1' })
export class RewardCategoryController {
  constructor(private readonly rewardCategoryService: RewardCategoryService) {}

  @Get()
  async findAll(): Promise<RewardCategory[]> {
    return await this.rewardCategoryService.findMany();
  }

  @Post()
  async createCategory(
    @Body() createRewardCategoryDto: CreateRewardCategoryDto,
  ): Promise<RewardCategory> {
    return await this.rewardCategoryService.create(createRewardCategoryDto);
  }
}
