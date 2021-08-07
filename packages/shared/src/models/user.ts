import * as yup from 'yup';

import { Survey } from './survey';

export type RegisteredUser = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
};

export type User = RegisteredUser & {
  gender: string;
  city: string;
  birthYear: number;
  isStudent: boolean;
};

export type RegisteredUserDTO = RegisteredUser;

export type UserDTO = User;

export type UserSurvey = User & { Survey: Survey };
export type UserSurveyDTO = User & { Survey: Survey };

export type PopulatedUser = User & { Survey: Survey };

export const userSchema = yup.object().shape({
  id: yup.number().typeError('Id must be a number').required('Id must be defined'),
  fullName: yup.string().typeError('Full name must be a string').required('Full name is required'),
});

export type GetAllUsersResponse = PopulatedUser[];

export type GetMeResponse = RegisteredUser | User | null;
