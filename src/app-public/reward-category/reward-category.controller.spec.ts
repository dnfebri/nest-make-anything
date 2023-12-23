import { Test, TestingModule } from '@nestjs/testing';
import { RewardCategoryController } from './reward-category.controller';
import { RewardCategoryService } from './reward-category.service';
import { CreateRewardCategoryDto } from './dto/crete-rewardCategory.dto';

describe('RewardCategoryController', () => {
  let rewardCtController: RewardCategoryController;
  let rewardCtService: RewardCategoryService;

  beforeEach(async () => {
    const apiServiceProvider = {
      provide: RewardCategoryService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findById: jest.fn(() => {
          return { data: 'Result' };
        }),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardCategoryController],
      providers: [RewardCategoryService, apiServiceProvider],
    }).compile();

    rewardCtController = module.get<RewardCategoryController>(
      RewardCategoryController,
    );
    rewardCtService = module.get<RewardCategoryService>(RewardCategoryService);
  });

  it('should be defined', () => {
    expect(rewardCtController).toBeDefined();
  });

  it('should call create reward category', async () => {
    const dto = new CreateRewardCategoryDto();
    expect(rewardCtController.createCategory(dto)).not.toEqual(null);
  });

  it('should calling create reward category method', async () => {
    const dto = new CreateRewardCategoryDto();
    const result = await rewardCtController.createCategory(dto);
    console.log(result);
    expect(rewardCtService.create).toHaveBeenCalled();
    expect(rewardCtService.create).toHaveBeenCalledWith(dto);
  });

  it('should calling find by id reward category method', async () => {
    const result = await rewardCtController.findById('1');
    console.log(result);
    expect(rewardCtService.findById).toHaveBeenCalledWith('1');
  });
});
