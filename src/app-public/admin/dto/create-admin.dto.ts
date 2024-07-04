import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Tegar Saputra' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({ example: 'tegar@bbiz.com' })
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Admin'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
