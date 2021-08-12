import type { Survey, UserId } from '@coderscamp/shared/models';

export abstract class SurveyRepositoryPort {
  abstract findByUserId(userId: UserId): Promise<Survey | null>;

  abstract save(data: Survey): Promise<Survey>;
}
