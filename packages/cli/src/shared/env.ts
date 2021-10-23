import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, validateOrReject } from 'class-validator';
import dotenv from 'dotenv';

import { createLogger } from './logger';

const logger = createLogger('Env Utils');

dotenv.config();

class EnvVariables {
  @Expose()
  @IsString()
  @IsNotEmpty()
  SUPABASE_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  SUPABASE_ANON_KEY: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  PROCESS_ST_CHECKLIST_URL: string;
}

export const env = plainToClass(EnvVariables, process.env, {
  excludeExtraneousValues: true,
  enableImplicitConversion: true,
});

export const validateEnv = async () => {
  logger.debug('Validating env variables');

  try {
    await validateOrReject(env);
    logger.debug('Env variables validated successfully');
  } catch (ex) {
    logger.error('Error when validating env variables');
    throw ex;
  }
};
