import request from 'supertest';
import app from '../../src/app';

describe('Endpoint api/heartbeat', () => {
  test('get api/heartbeat', done => {
    request(app)
      .get('/api/heartbeat')
      .set('Content-Type', 'application/json')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.heartbeat).toBe(true);
        return done();
      });
  });
});
