import { JwtTokenGuard } from './../auth/auth.guard';
import { UserService } from './user.service ';
import { JwtType } from '../auth/auth.type';
import { UserResponseType } from './user.type';
import { SignInUserDto, SignUpUserDto, UpdateUserDto } from './user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponseType })
  @Post('sign-up')
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseType> {
    return await this.userService.signUp(signUpUserDto, response);
  }

  @ApiCreatedResponse({ type: UserResponseType })
  @Post('sign-in')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseType> {
    return await this.userService.signIn(signInUserDto, response);
  }

  @ApiCreatedResponse({
    type: String,
    description: 'Successful logout',
  })
  @UseGuards(JwtTokenGuard)
  @Get('sign-out')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return await this.userService.signOut(request, response);
  }

  @UseGuards(JwtTokenGuard)
  @ApiCreatedResponse({ type: UserResponseType })
  @Get('refresh-session')
  async refreshSession(@Req() request: Request): Promise<UserResponseType> {
    return await this.userService.refreshSession(request);
  }

  @UseGuards(JwtTokenGuard)
  @Put('update')
  @ApiCreatedResponse({ type: UserResponseType })
  async updateHabit(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    const { id: userId } = request.user as JwtType;

    return await this.userService.updateUser(updateUserDto, userId);
  }
}
