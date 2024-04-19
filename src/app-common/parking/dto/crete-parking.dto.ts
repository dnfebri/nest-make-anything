import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({ example: 'w1234xw' })
  @IsString()
  @IsOptional()
  code: string;
}
