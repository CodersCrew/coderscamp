import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { UserErrorMessage } from '@coderscamp/shared/errors/user.errors';
import type { RegisteredUser } from '@coderscamp/shared/models';

import { UserRegisteredEvent } from '../../events';
import { UsersRepository } from '../../users.repository';
import { RegisterUserCommand } from '../registerUser.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: UsersRepository) {}

  async execute({ input }: RegisterUserCommand): Promise<RegisteredUser> {
    const userFromDataBase = await this.repository.getByGithubId(input.githubId);

    if (userFromDataBase) throw new BadRequestException(UserErrorMessage.USER_ALREADY_EXISTS);

    const user = await this.repository.create(input);

    this.eventBus.publish(new UserRegisteredEvent(user));

    return user;
  }
}
