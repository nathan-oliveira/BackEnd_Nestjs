import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/domain/repo/app.module';
import server from "src/data/infrastructure/config/server"

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await server.createServer();
    app = server.app;
    // const moduleFixture: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();

    // app = moduleFixture.createNestApplication();
    // await app.init();
  });

  afterEach(async () => {
    return await app.close();
  });

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .end(async (err: Error, res: request.Response) => {
        done()
      })

  });


  it('/users (GET)', (done) => {
    const dataJson = {
      "username": "nathan_oliviera",
      "email": "nathan_oliveiramendonca1999@hotmail.com",
      "password": "123456789",
      "realm": "realm realm realm"
    }

    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send(dataJson)
      .end((err: Error, res: request.Response) => {
        //expect(res.status).toBe(200)

        //expect(res.body).toMatchObject(dataJson);
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('realm')
        expect(res.body).toHaveProperty('emailVerified')

        done();
      })
  })
});
