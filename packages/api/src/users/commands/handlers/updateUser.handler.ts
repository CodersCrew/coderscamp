import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserErrorMessage } from '@coderscamp/shared/errors/user.errors';
import type { RegisteredUser } from '@coderscamp/shared/models';

import { UsersRepository } from '../../users.repository';
import { UpdateUserCommand } from '../updateUser.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private repository: UsersRepository) {}

  async execute({ input }: UpdateUserCommand): Promise<RegisteredUser> {
    const userFromDataBase = await this.repository.findById(input.id);

    if (!userFromDataBase) throw new BadRequestException(UserErrorMessage.USER_NOT_FOUND);

    const user = await this.repository.updateUser(input);

    return user;
  }
}
