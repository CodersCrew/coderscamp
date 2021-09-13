import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const registerError = {
  REGISTRATION_FORM_ALREADY_EXISTS: 'REGISTRATION_FORM_ALREADY_EXISTS',
};

export const REGISTER_ENDPOINT = '/user-registration';

export class RegisterBody {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'To pole jest wymagane' })
  fullName: string;

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

export type RegisterResponse = { userId: string };
