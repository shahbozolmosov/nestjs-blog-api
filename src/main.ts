import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config
  const configService = app.get(ConfigService);

  // Secure
  app.use(helmet());

  // Gzip
  app.use(
    compression({
      threshold: 0,
      level: 6,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }

        return compression.filter(req, res);
      },
    }),
  );

  // Cors
  app.enableCors({
    origin: configService.get<string>('app.frontendUrl'),
    credentials: true,
  });

  // Cookie parser
  app.use(cookieParser());

  // Global prefix
  app.setGlobalPrefix('/api');

  // Global filter
  // app.useGlobalFilters()

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages:
        configService.get<string>('app.nodenv') === 'production',
      enableDebugMessages: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  // Swagger
  // Running
  const port = process.env.PORT ?? 4040;
  await app.listen(port);

  console.log(`
      🚀 Application is running on: http://localhost:${port}
      📝 API Documentation: http://localhost:${port}/api/docs
      🌍 Environment: ${configService.get<string>('app.nodenv')}
    `);
}
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
