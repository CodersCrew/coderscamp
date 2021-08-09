import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRegisteredEvent } from '../userRegistered.event';

@CommandHandler(UserRegisteredEvent)
export class UserRegisterHandler implements ICommandHandler<UserRegisteredEvent> {
  async execute(_event: UserRegisteredEvent) {
    console.log('User registered');
  }
}
