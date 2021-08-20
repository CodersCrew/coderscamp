import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import type { AuthUser } from '.';

export class LoginBody implements Pick<AuthUser, 'email' | 'password'> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type LoginResponse = void;
