import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import type { AuthUser } from '.';

export const LOGIN_ENDPOINT = '/auth/login';

export class LoginBody implements Pick<AuthUser, 'email' | 'password'> {
  @Expose()
  @IsString()
  @IsEmail({}, { message: '"email" must be properly formatted' })
  @IsNotEmpty({ message: '"email" is required' })
  email: string;

  @Expose()
  @IsString({ message: '"password" must be a string' })
  @IsNotEmpty({ message: '"password" is required' })
  password: string;
}

export type LoginResponse = void;
