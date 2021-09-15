import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const registerError = {
  USER_WAS_ALREADY_REGISTERED: 'USER_WAS_ALREADY_REGISTERED',
};

export const REGISTER_ENDPOINT = '/user-registration';

export class RegisterBody {
  @Expose()
  @IsString({ message: '"fullName" must be a string' })
  @IsNotEmpty({ message: '"fullName" is required' })
  fullName: string;

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

export type RegisterResponse = { userId: string };
