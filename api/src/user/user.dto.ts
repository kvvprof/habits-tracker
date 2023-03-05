import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class SignUpUserDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @MinLength(6)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}

export class SignInUserDto extends OmitType(SignUpUserDto, ['name'] as const) {}

export class UpdateUserDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  readonly name: string;

  @MinLength(6)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  readonly password: string;
}
