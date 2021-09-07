import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AuthenticateModule } from 'src/authenticate/authenticate.module';
import { ShopModule } from 'src/shop/shop.module';
import { UsersModule } from 'src/users/users.module';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthenticateModule,
        ShopModule,
        UsersModule
      ],
      controllers: [
        AppController
      ],
      providers: [
        AppService
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('PING', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('PONG');
  });
});
