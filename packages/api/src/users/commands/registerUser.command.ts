import type { ICommand } from '@nestjs/cqrs';

import type { RegisteredUser } from '@coderscamp/shared/models';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly input: RegisteredUser) {}
}
