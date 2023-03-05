import { JwtTokenGuard } from './../auth/auth.guard';
import { HabitType } from './habit.type';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { HabitService } from './habit.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('habits')
@ApiTags('habits')
export class HabitController {
  constructor(private readonly habitsService: HabitService) {}

  @ApiCreatedResponse({ type: [HabitType] })
  @UseGuards(JwtTokenGuard)
  @Get()
  async getHabits(): Promise<HabitType[]> {
    return await this.habitsService.getHabits();
  }
}
