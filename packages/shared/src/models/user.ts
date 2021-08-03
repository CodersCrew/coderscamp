import * as yup from 'yup';

export type UserInformation = {
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

export type RegisteredUser = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
};

export type RegisteredUserDTO = RegisteredUser;

export type UserInformationDTO = UserInformation;

export type UserSurvey = UserInformation & { Survey: Survey };
export type UserSurveyDTO = UserInformation & { Survey: Survey };

export type User = UserInformation & { Survey: Survey };

export const userSchema = yup.object().shape({
  id: yup.number().typeError('Id must be a number').required('Id must be defined'),
  fullName: yup.string().typeError('Full name must be a string').required('Full name is required'),
});
