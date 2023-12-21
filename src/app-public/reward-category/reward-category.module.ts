import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardCategory } from 'src/entities/reward-category.entity';
import { RewardCategoryController } from './reward-category.controller';
import { RewardCategoryService } from './reward-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([RewardCategory])],
  controllers: [RewardCategoryController],
  providers: [RewardCategoryService],
  exports: [RewardCategoryService],
})
export class RewardCategoryModule {}
