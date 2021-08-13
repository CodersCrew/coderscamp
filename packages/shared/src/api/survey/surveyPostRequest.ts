export interface SurveyPostRequest {
  fullName: string;
  email: string;
  town: string;
  birthYear: number;
  gender: string;
  educationStatus: string;
  courseInformationSource: string[];
  associatedWords: string[];
  description: string;
  prevParticipation: string;
  reasonForRetakingCourse: string | null;
  expectations: string;
  experience: string | null;
  reasonToAccept: string;
  plans: string;
  absencePeriod: string;
  averageTime: number;
  marketingAccept: boolean;
}
