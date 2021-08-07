import { ICommand } from '@nestjs/cqrs';

import { Survey } from '@coderscamp/shared/models/user';

export class SaveSurveyCommand implements ICommand {
  constructor(public readonly input: Survey) {}
}
