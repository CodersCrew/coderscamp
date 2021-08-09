import { ICommand } from '@nestjs/cqrs';

import type { UserSurvey } from '@coderscamp/shared/models';

export class SaveFilledSurveyCommand implements ICommand {
  constructor(public readonly input: UserSurvey) {}
}
