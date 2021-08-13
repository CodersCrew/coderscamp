import type { Survey, UserId } from '@coderscamp/shared/models';

export const SURVEY_REPOSITORY_PORT = Symbol('SURVEY_REPOSITORY_PORT');
export interface SurveyRepositoryPort {
  findSurveyByUserId(userId: UserId): Promise<Survey | null>;

  save(data: Survey): Promise<Survey>;
}
