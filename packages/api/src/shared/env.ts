import { Expose, plainToClass } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, validateOrReject } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;
const APP_ENV_VALUES = ['local', 'review', 'staging', 'production'] as const;
const EVENT_REPOSITORY_VALUES = ['in-memory', 'prisma'] as const;
const EMAIL_SENDER_TYPE_VALUES = ['just-log', 'nodemailer'] as const;

class EnvVariables {
  @Expose()
  @IsIn(NODE_ENV_VALUES)
  NODE_ENV: typeof NODE_ENV_VALUES[number];

  @Expose()
  @IsIn(APP_ENV_VALUES)
  APP_ENV: typeof APP_ENV_VALUES[number];

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @Expose()
  @IsInt()
  @IsPositive()
  PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  CURRENT_COURSE_ID: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @Expose()
  @IsInt()
  @IsPositive()
  TOKEN_EXPIRATION_TIME: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  TOKEN_PREFIX: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  TOKEN_COOKIE_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  COOKIE_SECRET: string;

  @Expose()
  @IsUrl()
  PROCESS_ST_CHECKLIST_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsIn(EVENT_REPOSITORY_VALUES)
  EVENT_REPOSITORY: typeof EVENT_REPOSITORY_VALUES[number];

  @Expose()
  @IsNumber()
  SUBSCRIPTION_QUEUE_MAX_RETRY_COUNT: number;

  @Expose()
  @IsNumber()
  SUBSCRIPTION_QUEUE_WAITING_TIME_ON_RETRY_MS: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsIn(EMAIL_SENDER_TYPE_VALUES)
  EMAIL_SENDER_TYPE: typeof EMAIL_SENDER_TYPE_VALUES[number];

  @Expose()
  @IsString()
  @IsNotEmpty()
  APP_EMAIL_ADDRESS_FROM: string;

  @Expose()
  @IsInt()
  @IsPositive()
  NODEMAILER_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  NODEMAILER_HOST: string;

  @Expose()
  @IsString()
  NODEMAILER_USER: string;

  @Expose()
  @IsString()
  NODEMAILER_PASSWORD: string;
}

export const env = plainToClass(EnvVariables, process.env, {
  excludeExtraneousValues: true,
  enableImplicitConversion: true,
});

export const validateEnv = () => validateOrReject(env);
