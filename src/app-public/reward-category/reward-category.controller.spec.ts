import { Test, TestingModule } from '@nestjs/testing';
import { RewardCategoryController } from './reward-category.controller';

describe('RewardCategoryController', () => {
  let controller: RewardCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardCategoryController],
    }).compile();

    controller = module.get<RewardCategoryController>(RewardCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
