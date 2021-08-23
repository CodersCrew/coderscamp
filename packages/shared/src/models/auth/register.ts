import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const registerError = {
  REGISTRATION_FORM_ALREADY_EXISTS: 'REGISTRATION_FORM_ALREADY_EXISTS',
};

export class RegisterBody {
  @IsString()
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  fullName: string;

  @IsString()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  password: string;
}

export type RegisterResponse = void;
