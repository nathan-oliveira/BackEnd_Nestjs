import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/domain/repo/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let idNote: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    return await app.close();
  });

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .end(async (err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        done()
      })

  });

  it('/users (POST)', (done) => {
    const dataJson = {
      "username": "nathan_oliviera",
      "email": "nathan_oliveiramendonca@hotmail.com",
      "password": "123456789",
      "realm": "realm realm realm"
    }

    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send(dataJson)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe('object')

        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('realm')
        expect(res.body).toHaveProperty('emailVerified')

        done();
      })
  })

  it('/login (POST)', (done) => {
    const dataJson = {
      "email": "nathan_oliveiramendonca8@hotmail.com",
      "password": "123456789"
    }

    return request(app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send(dataJson)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe('object')

        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('realm')
        expect(res.body).toHaveProperty('emailVerified')
        expect(res.body).toHaveProperty('token')

        token = res.body.token

        done();
      })
  })

  it('/notes (POST)', (done) => {
    const dataJson = {
      "title": "Sacrifício de Isaac",
      "content": "O livro relata ainda que Ismael ficou feliz pelo sacrifício de Isaac, já que imaginou que ficaria com toda a herança de Abraão."
    }

    return request(app.getHttpServer())
      .post('/notes')
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .send(dataJson)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe('object')

        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('content')
        expect(res.body).toHaveProperty('userId')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('created_at')
        expect(res.body).toHaveProperty('updated_at')

        idNote = res.body.id
        done();
      })
  })

  it('/notes (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/notes')
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)

        done();
      })
  })

  it('/notes/:id (GET)', (done) => {
    return request(app.getHttpServer())
      .get(`/notes/${idNote}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(typeof res.body[0]).toBe('object')

        done();
      })
  })

  it('/notes/:id (PUT)', (done) => {
    const dataJson = {
      "content": "O livro relata ainda que Ismael ficou feliz pelo sacrifício de Isaac."
    }

    return request(app.getHttpServer())
      .put(`/notes/${idNote}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .send(dataJson)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(typeof res.body[0]).toBe('object')

        done();
      })
  })

  it('/notes/:id (DELETE)', (done) => {
    return request(app.getHttpServer())
      .delete(`/notes/${idNote}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .end((err: Error, res: request.Response) => {
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe('object')
        expect(res.body.affected).toBe(1)

        done();
      })
  })
});
