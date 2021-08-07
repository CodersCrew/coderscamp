export type Survey = {
  userId: number;
  description: string;
  alreadyTookCourse: boolean;
  reasonForRetakingCourse: string | null;
  expectations: string;
  experience: string;
  uniques: string;
  plans: string;
  unavailability: string;
  averageTime: number;
  associatedWords: string[];
  courseInformationSource: string;
};

export type SurveyDTO = Survey;
