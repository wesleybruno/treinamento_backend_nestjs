import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { environment, updateEnv } from './enviroment';

async function bootstrap() {
 
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
  await app.listen(3000);
}
bootstrap();
