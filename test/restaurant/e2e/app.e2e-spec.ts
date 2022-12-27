import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { PostgreSqlContainer } from 'testcontainers';
import { updateEnv } from '../../../src/enviroment';
import { env } from 'process';

env.RUNNING_TESTS = '1';
describe('Restaurant (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const pg = await new PostgreSqlContainer('postgres')
      .withExposedPorts(5432)
      .withDatabase('db')
      .withUsername('admin')
      .withPassword('123456')
      .start();

    updateEnv({
      production: false,
      runningTest: true,
      dbHost: 'localhost',
      dbPort: pg.getMappedPort(5432),
      dbName: 'db',
      dbUsername: 'admin',
      dbPassword: '123456',
      logging: false,
      authSecret: 'secret',
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/restaurant (GET)', () => {
    return request(app.getHttpServer())
      .get('/restaurant')
      .expect(200);
  });
});
