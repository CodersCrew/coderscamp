import type { UserSurvey, UserSurveyDTO } from '@coderscamp/shared/models';

export class SurveyMapper {
  static surveyToDomain(data: UserSurveyDTO): UserSurvey {
    return data;
  }

  static surveyToPlain(data: UserSurvey): UserSurveyDTO {
    return data;
  }
}
