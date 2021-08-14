import type { ICommand } from '@nestjs/cqrs';

import { RegisteredUser } from '@coderscamp/shared/models';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly input: Omit<RegisteredUser, 'id'>) {}
}
