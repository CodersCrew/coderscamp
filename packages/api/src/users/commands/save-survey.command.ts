import { ICommand } from '@nestjs/cqrs';

import { UserSurvey } from '@coderscamp/shared/models/user';

export class SaveSurveyCommand implements ICommand {
  constructor(public readonly input: UserSurvey) {}
}
