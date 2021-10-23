/* eslint-disable max-classes-per-file */
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export const userRoles = {
  participant: 'participant',
  student: 'student',
  mentor: 'mentor',
} as const;

export type Role = keyof typeof userRoles;

export class ParticipantCsvRow {
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

export class RegisterDTO {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class User {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsUrl()
  @IsOptional()
  checklist?: string;

  @Expose()
  @IsIn(Object.values(userRoles))
  role: Role;
}

export class WelcomeCsvRow {
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsUrl()
  @IsNotEmpty()
  checklist: string;
}
