import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubResponse, GithubUserData } from './github.model';

@Injectable()
export class GithubClient extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private jwtStrategy: JwtStrategy) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackUrl: process.env.GITHUB_CALLBACK_URL || '',
      scope: ['read:user'],
    });
  }

  async validate(
    _token: string,
    _refreshToken: string | undefined,
    { _json: profile }: GithubResponse,
    done: VerifiedCallback,
  ) {
    const { email, id, avatar_url: image, name } = profile;
    const user: GithubUserData = {
      email,
      githubId: id,
      image,
      fullName: name,
    };

    done(null, user);
  }

  async githubAuth(user: GithubUserData) {
    let userFromDatabase = await this.usersService.getByGithubId(user.githubId);
    if (!userFromDatabase) userFromDatabase = await this.usersService.create(user);
    return { accessToken: this.jwtStrategy.generateToken(userFromDatabase), profile: userFromDatabase };
  }
}
