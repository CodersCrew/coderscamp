import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy, StrategyOptions } from 'passport-jwt';

import { env } from '@/common/env';

import { JwtMapper } from './jwt.mapper';
import type { JwtPayload, UserFromJwt } from './jwt.types';

export const getTokenFromCookies: JwtFromRequestFunction = (req) => {
  let token: string | null = null;

  if (req?.cookies) {
    token = req.cookies[env.TOKEN_COOKIE_NAME];
  }

  if (token) {
    token = token.replace(env.TOKEN_PREFIX, '').trim();
  }

  return token;
};

const jwtOptions = {
  ignoreExpiration: false,
};

const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([getTokenFromCookies]),
  secretOrKey: env.JWT_SECRET,
  ...jwtOptions,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOptions);
  }

  validate(payload: JwtPayload): UserFromJwt {
    return JwtMapper.fromJwtToDomain(payload);
  }
}
