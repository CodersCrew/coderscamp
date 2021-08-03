import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ErrorMessage } from '../../error';
import { UserFactory } from '../../user.factory';
import { UsersRepository } from '../../users.repository';
import { UserRegisteredEvent } from '../userRegistered.event';

@CommandHandler(UserRegisteredEvent)
export class RegisterHandler implements ICommandHandler<UserRegisteredEvent> {
  constructor(private repository: UsersRepository, private factory: UserFactory) {}

  async execute({ input }: UserRegisteredEvent) {
    if (await this.repository.getByGithubId(input.githubId)) {
      throw new BadRequestException(ErrorMessage.USER_ALREADY_EXISTS);
    }

    const user = this.factory.create(input);

    user.register(input);
    user.commit();

    return user;
  }
}
