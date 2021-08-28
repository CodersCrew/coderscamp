import 'reflect-metadata';

import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, validateOrReject } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

class BuildEnvVariables {
  @Expose()
  @IsString()
  @IsNotEmpty()
  VITE_GOOGLE_API_KEY: string;
}

const env = plainToClass(BuildEnvVariables, process.env, {
  excludeExtraneousValues: true,
  enableImplicitConversion: true,
});

export const validateBuildEnv = () => validateOrReject(env);
