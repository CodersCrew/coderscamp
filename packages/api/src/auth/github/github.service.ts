import { Injectable } from '@nestjs/common';

import { User } from '@coderscamp/shared/models/user';

import { UsersService } from '../../users/users.service';
import { UserFromGithub } from '../../users/users.types';

@Injectable()
export class GithubService {
  constructor(private readonly usersService: UsersService) {}

  async authorizeUser(githubUserData: UserFromGithub): Promise<User> {
    let user = await this.usersService.getByGithubId(githubUserData.githubId);

    if (!user) {
      user = await this.usersService.create(githubUserData);
    }

    return user;
  }
}
