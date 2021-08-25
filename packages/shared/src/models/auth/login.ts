import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import type { AuthUser } from '.';

export class LoginBody implements Pick<AuthUser, 'email' | 'password'> {
  @IsString()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  password: string;
}

export type LoginResponse = void;
