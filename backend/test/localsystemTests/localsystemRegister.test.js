import request from 'supertest';
import { connectDb, disconnect } from '../../src/db/Mongoose';
import app from '../../src/app';
import { UserModel } from '../../src/models/db/UserModel';

const userTestElek = {
    localSystemId: 'localSystemId of Teszt Elek',
    name: 'Teszt Elek',
    email: 'teszt.elek@tesztelek.hu',
    userLevel: 'CUSTOMER',
    language: 'hu',
}

async function deleteTestData() {
  await UserModel.deleteOne({ name: userTestElek.name });
}

describe('Endpoint api/login', () => {
  beforeAll(async () => {
    await connectDb();
    await deleteTestData(); //if a testrun before canceled abnormaly, test data may be left behind
  });

  afterAll(async () => {
    await deleteTestData();
    await disconnect();
  });

  test('post localsystem/register', done => {
    request(app)
      .post('/localsystem/register')
      .set('Content-Type', 'application/json')
      .send({
        user: userTestElek,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.message).toBe('validation-email-sent');
        return done();
      });
  });

  test('post localsystem/register - same user again', done => {
    request(app)
      .post('/localsystem/register')
      .set('Content-Type', 'application/json')
      .send({
        user: userTestElek,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(406)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.message).toBe('user-already-exists');
        return done();
      });
  });
});
