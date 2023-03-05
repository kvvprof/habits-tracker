import { ApiProperty } from '@nestjs/swagger';
import { HabitTypeEnum, Habits } from '@prisma/client';

export class HabitType implements Habits {
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
  createdAt: Date;
}
