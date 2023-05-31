import * as Joi from 'joi';

export const DEFAULT_PORT = 3000;
const DEFAULT_DB_PORT = 5432;
const DEFAULT_RABBITMQ_PORT = 5672;
export interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DATABASE_URL: string;
  SENTRY_DSN: string;
  JWT_KEY: string;
  RABBITMQ_URL: string;
  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
}

export const configValidationSchema = Joi.object({
  // APP
  PORT: Joi.number().required().default(DEFAULT_PORT),
  NODE_ENV: Joi.string().required(),
  // DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(DEFAULT_DB_PORT),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  //SENTRY
  SENTRY_DSN: Joi.optional(),
  JWT_KEY: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
  RABBITMQ_HOST: Joi.string().required(),
  RABBITMQ_PORT: Joi.number().required().default(DEFAULT_RABBITMQ_PORT),
});
