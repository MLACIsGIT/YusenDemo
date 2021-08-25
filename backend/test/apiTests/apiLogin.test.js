import request from 'supertest';
import { connectDb, disconnect } from '../../src/db/Mongoose';
import app from '../../src/app';
import { UserModel } from '../../src/models/db/UserModel';
import Hash from '../../src/repository/Hash';

async function addTestData() {
  let passHash = await Hash.getHash('12345678');

  const userNotAcceptedTestElek = new UserModel({
    localSystemId: 'localSystemId',
    name: 'NOT ACCEPTED Teszt Elek',
    email: 'not.accepted.teszt.elek@tesztelek.hu',
    passHash,
    status: 'NOT ACCEPTED',
    userLevel: 'OWNER_SA',
    language: 'hu',
  });
  await userNotAcceptedTestElek.save();

  const userActiveTestElek = new UserModel({
    localSystemId: 'localSystemId',
    name: 'ACTIVE Teszt Elek',
    email: 'active.teszt.elek@tesztelek.hu',
    passHash,
    status: 'ACTIVE',
    userLevel: 'OWNER_SA',
    language: 'hu',
  });
  await userActiveTestElek.save();
}

async function deleteTestData() {
  await UserModel.deleteOne({ name: 'NOT ACCEPTED Teszt Elek' });
  await UserModel.deleteOne({ name: 'ACTIVE Teszt Elek' });
}

describe('Endpoint api/login', () => {
  beforeAll(async () => {
    await connectDb();
    await deleteTestData(); //if a testrun before canceled abnormaly, test data may be left behind
    await addTestData();
  });

  afterAll(async () => {
    await deleteTestData();
    await disconnect();
  });

  test('post api/login - wrong email', done => {
    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'wrong email',
        password: '12345678',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(410)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.message).toBe('invalid');
        return done();
      });
  });

  test('post api/login - wrong password', done => {
    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'teszt.elek@tesztelek.hu',
        password: 'wrong password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(410)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.message).toBe('invalid');
        return done();
      });
  });

  test('post api/login - correct login and password but not accepted', done => {
    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'not.accepted.teszt.elek@tesztelek.hu',
        password: '12345678',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(410)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.message).toBe('invalid');
        return done();
      });
  });

  test('post api/login - correct login and password and active login', done => {
    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'active.teszt.elek@tesztelek.hu',
        password: '12345678',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.token).toBeTruthy();
        return done();
      });
  });
});
