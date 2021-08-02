import { UserSurvey } from '@coderscamp/shared/models/user';

export class SaveSurveyCommand {
  constructor(public readonly input: UserSurvey) {}
}
