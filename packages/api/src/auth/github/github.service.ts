import { Injectable } from '@nestjs/common';

import { UserDTO } from '@coderscamp/shared/models/user';

import { UsersMapper } from '../../users/users.mapper';
import { UsersRepository } from '../../users/users.repository';
import { JwtStrategy } from '../jwt/jwt.strategy';
import type { GithubUserData } from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtStrategy: JwtStrategy) {}

  async authorizeUser(githubUserData: GithubUserData): Promise<{ accessToken: string; profile: UserDTO } | null> {
    let user = await this.usersRepository.getByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.usersRepository.create(githubUserData);
    }

    return {
      accessToken: this.jwtStrategy.generateToken(user),
      profile: UsersMapper.toPlain(user),
    };
  }
}
