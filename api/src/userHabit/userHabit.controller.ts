import { JwtTokenGuard } from './../auth/auth.guard';
import { JwtType } from '../auth/auth.type';
import { Request } from 'express';
import { CreateUserHabitDto, UpdateUserHabitDto } from './userHabit.dto';
import { UserHabitType } from './userHabit.type';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserHabitService } from './userHabit.service';

@Controller('user-habits')
@ApiTags('user-habits')
export class UserHabitController {
  constructor(private readonly userHabitService: UserHabitService) {}

  @ApiCreatedResponse({ type: UserHabitType })
  @UseGuards(JwtTokenGuard)
  @Post('habit/create')
  async createHabit(
    @Body() createUserHabitDto: CreateUserHabitDto,
    @Req() request: Request,
  ): Promise<UserHabitType> {
    const { id: userId } = request.user as JwtType;
    return await this.userHabitService.createHabit(createUserHabitDto, userId);
  }

  @UseGuards(JwtTokenGuard)
  @Get('/')
  @ApiCreatedResponse({ type: [UserHabitType] })
  async getHabits(@Req() request: Request): Promise<UserHabitType[]> {
    const { id: userId } = request.user as JwtType;
    return await this.userHabitService.getHabits(userId);
  }

  @UseGuards(JwtTokenGuard)
  @Get('habit/:habitId')
  @ApiCreatedResponse({
    type: UserHabitType,
  })
  async getHabit(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Req() request: Request,
  ): Promise<UserHabitType> {
    const { id: userId } = request.user as JwtType;
    return await this.userHabitService.getHabit(habitId, userId);
  }

  @UseGuards(JwtTokenGuard)
  @Put('habit/update')
  @ApiCreatedResponse({ type: UserHabitType })
  async updateHabit(
    @Body() updateUserHabitDto: UpdateUserHabitDto,
    @Req() request: Request,
  ) {
    const { id: userId } = request.user as JwtType;
    return await this.userHabitService.updateHabit(updateUserHabitDto, userId);
  }

  @UseGuards(JwtTokenGuard)
  @Delete('habit/delete/:habitId')
  @ApiCreatedResponse({ type: UserHabitType })
  async deleteHabit(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Req() request: Request,
  ): Promise<UserHabitType> {
    const { id: userId } = request.user as JwtType;
    return await this.userHabitService.deleteHabit(habitId, userId);
  }
}
