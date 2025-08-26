import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import Joi from 'joi';
import { appValidationSchema } from './config/app.config';
import { databaseValidationSchema } from './config/database.config';
import { BlogModule } from './modules/blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
