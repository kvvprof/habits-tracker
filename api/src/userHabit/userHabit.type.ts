import { ApiProperty } from '@nestjs/swagger';
import { UserHabits, HabitTypeEnum, UserHabitStatusEnum } from '@prisma/client';

export class UserHabitType implements UserHabits {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: HabitTypeEnum;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  startLives: number;

  @ApiProperty()
  spentLives: number;

  @ApiProperty()
  status: UserHabitStatusEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;
}
