import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardCategory } from '../../entities/reward-category.entity';
import { Repository } from 'typeorm';
import { CreateRewardCategoryDto } from './dto/crete-rewardCategory.dto';

@Injectable()
export class RewardCategoryService {
  constructor(
    @InjectRepository(RewardCategory)
    private rewardCategoryRepository: Repository<RewardCategory>,
  ) {}

  async findMany(): Promise<RewardCategory[]> {
    return await this.rewardCategoryRepository.find();
  }

  async create(data: CreateRewardCategoryDto): Promise<RewardCategory> {
    return await this.rewardCategoryRepository.save(
      this.rewardCategoryRepository.create(data),
    );
  }
}
