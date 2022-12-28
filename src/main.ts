import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { environment, updateAwsEnv, updateEnv } from './enviroment';
import * as AWS from 'aws-sdk';
import { BraiaGuard } from './core/guards/braia.guard';

async function bootstrap() {

  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  updateAwsEnv({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    queueName: process.env.AWS_SQS_ORDER_QUEUE,
    hostQueueName: process.env.AWS_HOST_QUEUE,
  })

  updateEnv({
    production: environment.production,
    dbHost: process.env.POSTGRES_HOST,
    dbPort: parseInt(process.env.POSTGRES_PORT),
    dbName: process.env.POSTGRES_DB,
    dbUsername: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    logging: environment.logging,
    authSecret: process.env.AUTH_SECRET_KEY,
    runningTest: process.env.RUNNING_TESTS == '1',
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new BraiaGuard(reflector));

  await app.listen(3000);
}
bootstrap();
