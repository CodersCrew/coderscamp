import { Survey } from '../survey';

export type UserId = string;

export type RegisteredUser = {
  id: UserId;
  githubId: number;
  fullName: string | null;
  email: string | null;
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

export type GetAllUsersResponse = User[];

export type GetMeResponse = RegisteredUser | User | null;
