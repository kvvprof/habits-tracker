import { JwtTokenStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtTokenStrategy, JwtService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
