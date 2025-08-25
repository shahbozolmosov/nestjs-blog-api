import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appValidationSchema = {
  PORT: Joi.number().default(4040),
  NODE_ENV: Joi.string().default('production'),
  FRONTEND_URL: Joi.string().required(),
};

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '', 10) || 5000,
  nodenv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
}));
