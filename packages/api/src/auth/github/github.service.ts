import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { NotRegisteredUser, RegisteredUser } from '@coderscamp/shared/models/user';

import { UsersRepository } from '../../users/users.repository';

@Injectable()
export class GithubService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authorizeUser(githubUserData: NotRegisteredUser): Promise<RegisteredUser> {
    let user = await this.usersRepository.findByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.usersRepository.create({ ...githubUserData, id: nanoid() });
    }

    return user;
  }
}
