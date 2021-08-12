import type { ICommand } from '@nestjs/cqrs';

import type { User } from '@coderscamp/shared/models';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly input: User) {}
}
