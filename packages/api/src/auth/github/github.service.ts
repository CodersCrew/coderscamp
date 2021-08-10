import { Injectable } from '@nestjs/common';

import type { RegisteredUser } from '@coderscamp/shared/models';

import { UserModel } from '../../users/user.model';
import { GithubRepository } from './github.repository';
import type { NotRegisteredUser } from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly githubRepository: GithubRepository) {}

  async authorizeUser(githubUserData: NotRegisteredUser): Promise<RegisteredUser> {
    let user = await this.githubRepository.findUserByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.githubRepository.createUser(githubUserData);

      const userModel = new UserModel(user);

      userModel.register(user);
    }

    return user;
  }
}
