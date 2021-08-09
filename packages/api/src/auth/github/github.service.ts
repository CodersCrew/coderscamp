import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/users/user.model';

import { RegisteredUser } from '@coderscamp/shared/models/user';

import { GithubRepository } from './github.repository';

@Injectable()
export class GithubService {
  constructor(private readonly githubRepository: GithubRepository) {}

  async authorizeUser(githubUserData: Omit<RegisteredUser, 'id'>): Promise<RegisteredUser> {
    let user = await this.githubRepository.findUserByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.githubRepository.createUser(githubUserData);

      const userModel = new UserModel(user);

      userModel.register(user);
    }

    return user;
  }
}
