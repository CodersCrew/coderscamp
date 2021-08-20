import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import type { AuthUser, UserRegistration } from '.';

export const registerError = {
  REGISTRATION_FORM_ALREADY_EXISTS: 'REGISTRATION_FORM_ALREADY_EXISTS',
};

export class RegisterBody implements Omit<UserRegistration & AuthUser, 'id'> {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type RegisterResponse = void;
