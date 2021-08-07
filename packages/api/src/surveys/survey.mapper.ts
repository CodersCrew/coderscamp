import { Survey, SurveyDTO } from '@coderscamp/shared/models/survey';

export class SurveyMapper {
  static surveyToDomain(data: SurveyDTO): Survey {
    return data;
  }

  static surveyToPlain(data: Survey): SurveyDTO {
    return data;
  }
}
