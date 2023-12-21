import { Controller, Get } from '@nestjs/common';
import { RewardCategoryService } from './reward-category.service';
import { RewardCategory } from 'src/entities/reward-category.entity';

@Controller({ path: 'reward-category', version: '1' })
export class RewardCategoryController {
  constructor(private readonly rewardCategoryService: RewardCategoryService) {}

  @Get()
  async findAll(): Promise<RewardCategory[]> {
    return await this.rewardCategoryService.findMany();
  }
}
