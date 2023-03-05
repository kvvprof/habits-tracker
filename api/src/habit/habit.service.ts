import { HabitType } from './habit.type';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HabitService {
  constructor(private readonly prisma: PrismaService) {}

  async getHabits(): Promise<HabitType[]> {
    const habits: HabitType[] = await this.prisma.habits.findMany();

    if (!habits.length) {
      throw new NotFoundException('No records found');
    }

    return habits;
  }
}
