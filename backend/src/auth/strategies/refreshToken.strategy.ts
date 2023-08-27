import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { JwtPayload } from '../types/jwtPayload';
import { JwtPayloadWithRefresh } from '../types/jwtPayloadWithRefresh';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies.refreshToken,
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefresh {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken)
      throw new HttpException('Refresh token malformed', HttpStatus.FORBIDDEN);

    return {
      ...payload,
      refreshToken,
    };
  }
}
