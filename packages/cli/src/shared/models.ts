/* eslint-disable max-classes-per-file */
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

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
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email: string;
}

export class CreateUserDTO {
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
  @IsIn(Object.values(userRoles))
  role: Role;
}

export class User {
  @Expose()
  @IsNumber()
  id: number;

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
