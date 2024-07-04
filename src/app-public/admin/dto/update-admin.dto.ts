import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'Tegar Saputra', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'tegar@bbiz.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'secret', required: false })
  @IsOptional()
  curent_password?: string;

  @ApiProperty({ example: 'secret', required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  role_id?: number;
}
