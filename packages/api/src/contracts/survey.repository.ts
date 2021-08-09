import { Survey } from '@coderscamp/shared/models/survey';

export abstract class SurveyRepositoryPort {
  abstract findByUserId(userId: number): Promise<Survey | null>;

  abstract save(data: Survey): Promise<Survey>;
}
