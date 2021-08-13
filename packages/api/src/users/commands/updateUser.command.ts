import type { ICommand } from '@nestjs/cqrs';

import type { User, UserId } from '@coderscamp/shared/models';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly input: Partial<User> & { id: UserId }) {}
}
