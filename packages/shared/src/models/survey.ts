import type { User, UserId } from './user';

export type Survey = {
  userId: UserId;
  description: string;
  prevParticipation: string;
  reasonForRetakingCourse: string | null;
  expectations: string;
  experience: string | null;
  reasonToAccept: string;
  plans: string;
  absencePeriod: string;
  averageTime: number;
  associatedWords: string[];
  courseInformationSource: string[];
  marketingAccept: boolean;
};

export type CreateSurveyData = Omit<User, 'image'> & Survey;
