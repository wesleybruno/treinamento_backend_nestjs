import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { PostgreSqlContainer } from 'testcontainers';
import { environment } from '../../../src/enviroment';


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

    environment.dbPort = pg.getMappedPort(5432);
    environment.logging = false;

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
      .expect(200)
      .expect('This action returns all restaurant');
  });
});
