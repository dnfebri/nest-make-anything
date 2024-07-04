import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/shared/transformers/lower-case.transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'admin@admin.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsNotEmpty()
  password: string;
}
