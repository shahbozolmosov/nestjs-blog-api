import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import Joi from 'joi';
import { appValidationSchema } from './config/app.config';
import { databaseValidationSchema } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
      validationSchema: Joi.object({
        ...appValidationSchema,
        ...databaseValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
