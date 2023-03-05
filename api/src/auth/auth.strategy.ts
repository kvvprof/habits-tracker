import { JwtType } from './auth.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      'token' in request.cookies &&
      request.cookies.token.length > 0
    ) {
      return request.cookies.token;
    }
    return null;
  }

  validate(request: Request, payload: JwtType): JwtType {
    return { ...payload };
  }
}
