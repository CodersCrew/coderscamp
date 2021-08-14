import { SurveyPostRequest } from '@coderscamp/shared/api';
import type { UserId } from '@coderscamp/shared/models';

import { UserSurveyUpdateData } from './types';

export class SurveyMapper {
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
  }: SurveyPostRequest & { id: UserId }): UserSurveyUpdateData {
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
}
