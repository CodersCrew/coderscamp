import { Injectable } from '@nestjs/common';

import { User } from '@coderscamp/shared/models/user';

import { UsersRepository } from '../../users/users.repository';
import { UserFromGithub } from '../../users/users.types';

@Injectable()
export class GithubService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authorizeUser(githubUserData: UserFromGithub): Promise<User> {
    let user = await this.usersRepository.getByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.usersRepository.create(githubUserData);
    }

    return user;
  }
}
