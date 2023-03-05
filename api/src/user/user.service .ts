import { getRandomPassword } from '../utils/helpers';
import { Response, Request } from 'express';
import { SignUpUserDto, SignInUserDto, UpdateUserDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { UserType, UserResponseType } from './user.type';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RefreshTokens } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async signUp(
    signUpUserDto: SignUpUserDto,
    response: Response,
  ): Promise<UserResponseType> {
    const user: UserType = await this.prisma.users.findFirst({
      where: { email: signUpUserDto.email },
    });

    if (user) {
      throw new BadRequestException('The user is already registered');
    }

    const hash: string = await bcrypt.hash(signUpUserDto.password, 10);

    const newUser: UserType = await this.prisma.users.create({
      data: {
        name: signUpUserDto.name,
        email: signUpUserDto.email,
        password: hash,
      },
    });

    await this.setCookie(response, newUser);

    return this.buildUserResponse(newUser);
  }

  async signIn(
    signInUserDto: SignInUserDto,
    response: Response,
  ): Promise<UserResponseType> {
    const user: UserType = await this.prisma.users.findFirst({
      where: { email: signInUserDto.email },
    });

    if (!user) {
      throw new BadRequestException('The user is not registered');
    }

    const validPassword = await bcrypt.compare(
      signInUserDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new BadRequestException('Invalid password');
    }

    await this.setCookie(response, user);

    return this.buildUserResponse(user);
  }

  async signOut(request: Request, response: Response): Promise<string> {
    const refreshToken: string = request.cookies.token;

    await this.prisma.refreshTokens.delete({
      where: { token: refreshToken },
    });

    this.setCookie(response, null);

    return 'Successful sign out';
  }

  async refreshSession(request: Request): Promise<UserResponseType> {
    const refreshToken: string = request.cookies.token;

    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const refreshTokenData: RefreshTokens =
      await this.prisma.refreshTokens.findFirst({
        where: { token: refreshToken },
      });

    if (!refreshTokenData) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user: UserType = await this.prisma.users.findFirst({
      where: { id: refreshTokenData.userId },
    });

    return this.buildUserResponse(user);
  }

  async buildUserResponse(user: UserType): Promise<UserResponseType> {
    const accessToken: string = await this.authService.getAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken: accessToken,
    };
  }

  async initRefreshToken(user: UserType) {
    const refreshToken: string = await this.authService.getRefreshToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    await this.prisma.refreshTokens.create({
      data: { userId: user.id, token: refreshToken },
    });

    return refreshToken;
  }

  async setCookie(response: Response, user: UserType | null): Promise<unknown> {
    if (user) {
      const refreshToken = await this.initRefreshToken(user);

      return response.cookie('token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 180 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'strict',
        domain: 'habits-tracker.ru',
      });
    } else {
      return response.clearCookie('token', {
        httpOnly: true,
        secure: true,
        maxAge: 180 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'strict',
        domain: 'habits-tracker.ru',
      });
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userId: number,
  ): Promise<UserResponseType> {
    const user: UserType = await this.prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('Bad request');
    }

    if (updateUserDto.password) {
      const hash: string = await bcrypt.hash(updateUserDto.password, 10);

      const updatedUser: UserType = await this.prisma.users.update({
        where: { id: userId },
        data: { password: hash },
      });

      return this.buildUserResponse(updatedUser);
    } else {
      const updatedUser: UserType = await this.prisma.users.update({
        where: { id: userId },
        data: { name: updateUserDto.name },
      });

      return this.buildUserResponse(updatedUser);
    }
  }

  async resetPassword(email: string) {
    const user: UserType = await this.prisma.users.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException('Bad request');
    }

    const password: string = getRandomPassword();

    const hash: string = await bcrypt.hash(password, 10);

    await this.prisma.users.update({
      where: { id: user.id },
      data: { password: hash },
    });

    return password;
  }
}
