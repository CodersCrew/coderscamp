import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';
import { ConfigService } from 'src/shared/config.service';

import { GithubDTO, GithubUserData } from '../auth.model';

@Injectable()
export class GithubClient extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super(configService.githubClientConfig);
  }

  async validate(_token: string, _refreshToken: string | undefined, profile: GithubDTO, done: VerifiedCallback) {
    const { emails, id, photos } = profile;
    const user = {
      email: emails[0].value,
      githubId: Number(id),
      image: photos[0].value,
    } as GithubUserData;

    done(null, user);
  }
}
