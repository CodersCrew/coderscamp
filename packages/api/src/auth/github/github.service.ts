import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import type { RegisteredUser } from '@coderscamp/shared/models';

import { RegisterUserCommand } from '../../users/commands';
import { FindUserWithGivenGithubIdQuery } from '../../users/queries';
import { UserModel } from '../../users/user.model';
import type { NotRegisteredUser } from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async authorizeUser(githubUserData: NotRegisteredUser): Promise<RegisteredUser> {
    let user = await this.queryBus.execute(new FindUserWithGivenGithubIdQuery(githubUserData.githubId));

    if (!user) {
      user = await this.commandBus.execute<RegisterUserCommand, RegisteredUser>(
        new RegisterUserCommand(githubUserData),
      );

      const userModel = new UserModel(user);

      userModel.register(user);
    }

    return user;
  }
}
