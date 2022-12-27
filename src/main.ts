import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { updateEnv } from './enviroment';
import { JwtAuthGuard } from './auth/auth.controller';
import * as AWS from 'aws-sdk';

async function bootstrap() {

  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  updateEnv({
    production: false,
    dbHost: process.env.POSTGRES_HOST,
    dbPort: parseInt(process.env.POSTGRES_PORT),
    dbName: process.env.POSTGRES_DB,
    dbUsername: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    logging: true,
    authSecret: process.env.AUTH_SECRET_KEY,
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(3000);
}
bootstrap();
