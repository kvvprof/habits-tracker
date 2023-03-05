import { HabitTypeEnum, UserHabitStatusEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsPositive,
  Max,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateUserHabitDto {
  @MaxLength(55)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @MaxLength(1000)
  @IsString()
  @ApiProperty({ required: false })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: HabitTypeEnum })
  readonly type: HabitTypeEnum;

  @Max(365)
  @IsPositive()
  @IsInt()
  @ApiProperty()
  readonly duration: number;

  @Max(5)
  @IsInt()
  @ApiProperty()
  readonly startLives: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: UserHabitStatusEnum, required: false })
  readonly status: UserHabitStatusEnum;
}

export class UpdateUserHabitDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  readonly id: number;

  @MaxLength(90)
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly title: string;

  @MaxLength(1000)
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: HabitTypeEnum, required: false })
  readonly type: HabitTypeEnum;

  @Max(365)
  @IsPositive()
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly duration: number;

  @Max(5)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly startLives: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly spentLives: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: UserHabitStatusEnum, required: false })
  readonly status: UserHabitStatusEnum;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly updatedAt: Date;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly userId: number;
}
