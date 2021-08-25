import request from 'supertest';
import { connectDb, disconnect } from '../../src/db/Mongoose';
import app from '../../src/app';
import { InvoiceModel } from '../../src/models/db';

const testInvoice = {
  externalSystemId: 'testInvoice externalSystemId',
  PartnerId: 'PartnerId',
  invoiceNumber: 'testInvoice - invoiceNumber',
  invoiceType: 'A/P INVOICE',
  invoiceDate: '2021.08.01',
  deliveryDate: '2021.08.01',
  paymentMethod: 'BANKTRANSFER',
  dueDate: '2021.08.01',
  customerName: 'Test GmbH.',
  customerCountryCode: 'de',
  customerPostalCode: '11111',
  customerCity: 'Hamburg',
  customerAddressDetails: 'Bahnhofstrasse 9',
  customerTaxNum: 'EU-123456789',
  customerGroupMemberTaxNum: 'EU-123456789',
  invoiceCurrency: 'EUR',
  sumOfNet: 100,
  sumOfTax: 0,
  sumOfGross: 100,
  payStatus: 'PAYED',
  fullyPaidDate: 'string',
  paidAmount: 0,
};

async function deleteTestData() {
  await InvoiceModel.deleteMany({
    externalSystemId: testInvoice.externalSystemId,
  });
}

describe('Endpoint localsystem/invoices/upload', () => {
  beforeAll(async () => {
    await connectDb();
    await deleteTestData(); //if a testrun before canceled abnormaly, test data may be left behind
  });

  afterAll(async () => {
    await deleteTestData();
    await disconnect();
  });

  test('post localsystem/invoices/upload', done => {
    request(app)
      .post('/localsystem/invoices/upload')
      .set('Content-Type', 'application/json')
      .send(testInvoice)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.externalSystemId).toBe(testInvoice.externalSystemId);
        return done();
      });
  });

  test('post localsystem/invoices/upload again', done => {
    request(app)
      .post('/localsystem/invoices/upload')
      .set('Content-Type', 'application/json')
      .send(testInvoice)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.externalSystemId).toBe(testInvoice.externalSystemId);
        return done();
      });
  });

  test('post localsystem/invoices/upload testinvoice should exist only once in database', async () => {
    const result = await InvoiceModel.find({
      $and: [
        { externalSystemId: testInvoice.externalSystemId },
        { PartnerId: testInvoice.PartnerId },
      ],
    });
    expect(result.length).toBe(1);
  });
});
