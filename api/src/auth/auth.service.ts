import { JwtCreateType } from './auth.type';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken({ id, name, email }: JwtCreateType): Promise<string> {
    const accessToken: string = await this.jwtService.signAsync(
      {
        id,
        name,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    return accessToken;
  }

  async getRefreshToken({ id, name, email }: JwtCreateType): Promise<string> {
    const refreshToken: string = await this.jwtService.signAsync(
      {
        id,
        name,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '180d',
      },
    );

    return refreshToken;
  }
}
