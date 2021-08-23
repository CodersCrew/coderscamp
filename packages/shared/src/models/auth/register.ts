import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const registerError = {
  REGISTRATION_FORM_ALREADY_EXISTS: 'REGISTRATION_FORM_ALREADY_EXISTS',
};

export class RegisterBody {
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
