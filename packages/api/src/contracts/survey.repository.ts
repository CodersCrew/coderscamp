import type { Survey, UserSurvey } from '@coderscamp/shared/models';

export abstract class SurveyRepositoryPort {
  abstract findByUserId(userId: number): Promise<Survey | null>;

  abstract save(data: Survey): Promise<Survey>;

  abstract saveAndUpdateRelatedUser(data: UserSurvey): Promise<UserSurvey>;
}
