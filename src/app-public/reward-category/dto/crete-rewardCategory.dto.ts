import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRewardCategoryDto {
  @ApiProperty({ example: 'Category test' })
  @IsNotEmpty()
  name: string;
}

export class RewardCategoryDtoById {
  @IsNotEmpty()
  id: string;
}
