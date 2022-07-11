import * as Joi from 'joi';
import { EnvironmentVariables } from './environment-variables.interface';

export const validationSchema = Joi.object<EnvironmentVariables>({
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().integer().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('password'),
  DB_DATABASE: Joi.string().default('image-likes'),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRATION_TIME: Joi.string().default('1d'),
  UNSPLASH_ACCESS_KEY: Joi.string().required(),
});
