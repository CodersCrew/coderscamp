import Joi from '@hapi/joi';
import dotenv from 'dotenv';

export type Env = Readonly<{
  NODE_ENV: 'development' | 'test' | 'production';
  APP_ENV: 'local' | 'review' | 'staging' | 'production';
  DATABASE_URL: string;
  PORT: number;

  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CALLBACK_URL: string;

  JWT_SECRET: string;
  TOKEN_EXPIRATION_TIME: number;
  TOKEN_PREFIX: string;
  TOKEN_COOKIE_NAME: string;
  COOKIE_SECRET: string;
}>;

const populateEnv = (): NodeJS.ProcessEnv => {
  dotenv.config();

  return process.env;
};

const validateEnvVariables = (env: NodeJS.ProcessEnv): Env => {
  const schema: Joi.ObjectSchema<Env> = Joi.object({
    NODE_ENV: Joi.string().required().valid('development', 'test', 'production'),
    APP_ENV: Joi.string().required().valid('local', 'review', 'staging', 'production'),
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().required(),

    GITHUB_CLIENT_ID: Joi.string().required(),
    GITHUB_CLIENT_SECRET: Joi.string().required(),
    GITHUB_CALLBACK_URL: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    TOKEN_EXPIRATION_TIME: Joi.number().required(),
    TOKEN_PREFIX: Joi.string().required(),
    TOKEN_COOKIE_NAME: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
  });

  const validation = schema.validate(env, { stripUnknown: true });

  if (validation.error) {
    throw new Error(`Config validation error: ${validation.error.message}`);
  }

  return validation.value;
};

export const env = validateEnvVariables(populateEnv());
