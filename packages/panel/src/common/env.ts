import dotenv from 'dotenv';
import Joi from 'joi';

const populateEnv = (): NodeJS.ProcessEnv => {
  dotenv.config();

  return process.env;
};

export const validateEnvVariables = () => {
  const schema: Joi.ObjectSchema<ImportMetaEnv> = Joi.object({
    VITE_GOOGLE_API_KEY: Joi.string().required(),
  });

  const validation = schema.validate(populateEnv(), { stripUnknown: true });

  if (validation.error) {
    throw new Error(`Config validation error: ${validation.error.message}`);
  }
};
