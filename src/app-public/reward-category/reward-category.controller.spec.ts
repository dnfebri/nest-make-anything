import { Test, TestingModule } from '@nestjs/testing';
import { RewardCategoryController } from './reward-category.controller';
import { RewardCategoryService } from './reward-category.service';

describe('RewardCategoryController', () => {
  let controller: RewardCategoryController;

  const rewardCategoryServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardCategoryController],
      providers: [RewardCategoryService],
    })
      .overrideProvider(RewardCategoryService)
      .useValue(rewardCategoryServiceMock)
      .compile();

    controller = module.get<RewardCategoryController>(RewardCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
