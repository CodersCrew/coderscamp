import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

import { env } from '@/common/env';

import { UsersMapper } from '../../users/users.mapper';
import type { GithubResponse } from './github.types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackUrl: env.GITHUB_CALLBACK_URL,
      scope: ['read:user'],
    });
  }

  async validate(_token: string, _refreshToken: string | undefined, { _json: profile }: GithubResponse) {
    return UsersMapper.fromGithubInputToDomain(profile);
  }
}
