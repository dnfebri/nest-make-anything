import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardCategory } from 'src/entities/reward-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardCategoryService {
  constructor(
    @InjectRepository(RewardCategory)
    private rewardCategoryRepository: Repository<RewardCategory>,
  ) {}

  async findMany(): Promise<RewardCategory[]> {
    return await this.rewardCategoryRepository.find();
  }
}
