import { UserHabitType } from './userHabit.type';
import { CreateUserHabitDto, UpdateUserHabitDto } from './userHabit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserHabitService {
  constructor(private readonly prisma: PrismaService) {}

  async createHabit(
    createUserHabitDto: CreateUserHabitDto,
    userId: number,
  ): Promise<UserHabitType> {
    return await this.prisma.userHabits.create({
      data: { ...createUserHabitDto, userId: userId },
    });
  }

  async getHabits(userId: number): Promise<UserHabitType[]> {
    const userHabits: UserHabitType[] = await this.prisma.userHabits.findMany({
      where: { userId: userId },
      orderBy: {
        id: 'desc',
      },
    });

    return userHabits;
  }

  async getHabit(habitId: number, userId: number): Promise<UserHabitType> {
    const userHabit: UserHabitType = await this.prisma.userHabits.findFirst({
      where: { id: habitId, userId: userId },
    });

    if (!userHabit) {
      throw new BadRequestException('Bad request');
    }

    return userHabit;
  }

  async updateHabit(
    updateUserHabitDto: UpdateUserHabitDto,
    userId: number,
  ): Promise<UserHabitType> {
    const userHabit: UserHabitType = await this.prisma.userHabits.findFirst({
      where: { id: updateUserHabitDto.id, userId: userId },
    });

    if (!userHabit) {
      throw new BadRequestException('Bad request');
    }

    return await this.prisma.userHabits.update({
      where: { id: updateUserHabitDto.id },
      data: updateUserHabitDto,
    });
  }

  async deleteHabit(habitId: number, userId: number): Promise<UserHabitType> {
    const userHabit: UserHabitType = await this.prisma.userHabits.findFirst({
      where: { id: habitId, userId: userId },
    });

    if (!userHabit) {
      throw new BadRequestException('Bad request');
    }

    return await this.prisma.userHabits.delete({
      where: { id: habitId },
    });
  }
}
