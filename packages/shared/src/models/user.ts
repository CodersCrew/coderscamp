export type User = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
  gender: string;
  city: string;
  birthYear: number;
  isStudent: boolean;
};

export type Survey = {
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

export type UserSurvey = User & { UserSurvey: Survey };

export type RegisteredUserDTO = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
};

export type RegisteredUser = RegisteredUserDTO;

export type UserDTO = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
  gender: string;
  city: string;
  birthYear: number;
  isStudent: boolean;
};

export type UserSurveyDTO = User & { UserSurvey: Survey };
