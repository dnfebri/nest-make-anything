import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty({ example: 'ggwp' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'ggwp' })
  @IsNotEmpty()
  confirm_password: string;
}
