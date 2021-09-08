import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import type { AuthUser } from '.';

export const LOGIN_ENDPOINT = '/auth/login';

export class LoginBody implements Pick<AuthUser, 'email' | 'password'> {
  @Expose()
  @IsString()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  password: string;
}

export type LoginResponse = void;
