import { ICommand } from '@nestjs/cqrs';

import type { Survey } from '@coderscamp/shared/models';

export class SaveFilledSurveyCommand implements ICommand {
  constructor(public readonly input: Survey) {}
}
