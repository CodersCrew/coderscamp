import type { ICommand } from '@nestjs/cqrs';

import { NotRegisteredUser } from '../../auth/github/github.types';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly input: NotRegisteredUser) {}
}
