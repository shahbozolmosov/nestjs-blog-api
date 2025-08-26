import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config
  const configService = app.get(ConfigService);

  // Secure
  // Cors
  // Cookie parser
  // Global prefix
  // Versioning
  // Validation
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
