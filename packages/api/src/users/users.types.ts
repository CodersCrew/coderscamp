import { User } from '@coderscamp/shared/models/user';

export type UserFromGithub = Pick<User, 'fullName' | 'email' | 'image'>;

export type UserFromJwt = Pick<User, 'id'>;

export type UserId = string;
