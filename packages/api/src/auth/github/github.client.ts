import { Injectable } from '@nestjs/common';
import { PassportStrategy as GithubStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';

import type { RegisteredUserDTO, UserDTO } from '@coderscamp/shared/models/user';

import { UsersEntity } from '../../users/users.entity';
import { UsersMapper } from '../../users/users.mapper';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import type { GithubResponse, GithubUserData } from './github.model';

@Injectable()
export class GithubClient extends GithubStrategy(Strategy) {
  constructor(private usersEntity: UsersEntity, private jwtStrategy: JwtStrategy) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
      scope: ['read:user'],
    });
  }

  async validate(
    _token: string,
    _refreshToken: string | undefined,
    { _json: profile }: GithubResponse,
    done: VerifiedCallback,
  ) {
    done(null, UsersMapper.fromGithubToDomain(profile));
  }

  async githubAuth(
    user: GithubUserData,
  ): Promise<{ accessToken: string; profile: UserDTO | RegisteredUserDTO } | null> {
    let userFromDatabase = await this.usersEntity.getByGithubId(user.githubId);
    if (!userFromDatabase) {
      userFromDatabase = await this.usersEntity.register(user);
    }
    return userFromDatabase
      ? {
          accessToken: this.jwtStrategy.generateToken(userFromDatabase),
          profile: UsersMapper.userToPlain(userFromDatabase),
        }
      : null;
  }
}
