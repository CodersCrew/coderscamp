import { SurveyPostRequest } from '@coderscamp/shared/api';
import type { Survey, User, UserId, UserSurvey, UserSurveyDTO } from '@coderscamp/shared/models';

export class SurveyMapper {
  static surveyToDomain(data: UserSurveyDTO): UserSurvey {
    return data;
  }

  static surveyPostRequestToDomain({
    description,
    prevParticipation,
    reasonForRetakingCourse,
    expectations,
    experience,
    reasonToAccept,
    plans,
    absencePeriod,
    averageTime,
    associatedWords,
    courseInformationSource,
    marketingAccept,
    ...user
  }: SurveyPostRequest & { id: UserId }): Partial<User> & { id: UserId; Survey: Survey } {
    return {
      Survey: {
        userId: user.id,
        description,
        prevParticipation,
        reasonForRetakingCourse,
        expectations,
        experience,
        reasonToAccept,
        plans,
        absencePeriod,
        averageTime,
        associatedWords,
        courseInformationSource,
        marketingAccept,
      },
      ...user,
    };
  }

  static surveyToPlain(data: UserSurvey): UserSurveyDTO {
    return data;
  }
}
