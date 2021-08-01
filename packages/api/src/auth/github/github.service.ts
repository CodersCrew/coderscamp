import { Injectable } from '@nestjs/common';

import { UserDTO } from '@coderscamp/shared/models/user';

import { UsersMapper } from '../../users/users.mapper';
import { UsersRepository } from '../../users/users.repository';
import type { GithubUserData } from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authorizeUser(githubUserData: GithubUserData): Promise<UserDTO> {
    let user = await this.usersRepository.getByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.usersRepository.create(githubUserData);
    }

    return UsersMapper.toPlain(user);
  }
}
