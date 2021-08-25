import request from 'supertest';
import { connectDb, disconnect } from '../../src/db/Mongoose';
import app from '../../src/app';
import { UserModel, InvoiceModel } from '../../src/models/db';
import { UserService } from '../../src/services';
import Hash from '../../src/repository/Hash';

let tokenOfOwner;
let tokenOfCustomer;

async function addTestData() {
  let passHash = await Hash.getHash('12345678');

  const userOwnerTestElek = new UserModel({
    localSystemId: 'id of owner',
    name: 'OWNER Teszt Elek',
    email: 'owner.teszt.elek@tesztelek.hu',
    passHash,
    status: 'ACTIVE',
    userLevel: 'OWNER_SA',
    language: 'hu',
  });
  await userOwnerTestElek.save();

  const userCustomerTestElek = new UserModel({
    localSystemId: 'id of customer',
    name: 'CUSTOMER Teszt Elek',
    email: 'customer.teszt.elek@tesztelek.hu',
    passHash,
    status: 'ACTIVE',
    userLevel: 'CUSTOMER',
    language: 'hu',
  });
  await userCustomerTestElek.save();

  const invoiceOfOwner = new InvoiceModel({
    externalSystemId: 'INV001',
    PartnerId: 'id of owner',
    invoiceNumber: 'invoice of owner 001',
    invoiceType: 'A/P INVOICE',
    invoiceDate: '2021.08.01',
    deliveryDate: '2021.08.01',
    paymentMethod: 'BANKTRANSFER',
    dueDate: '2021.08.01',
    customerName: 'OWNER Teszt Elek',
    customerCountryCode: 'hu',
    customerPostalCode: '1111',
    customerCity: 'City',
    customerAddressDetails: '',
    customerTaxNum: 'TaxNum',
    customerGroupMemberTaxNum: 'HU-TaxNum',
    invoiceCurrency: 'HUF',
    sumOfNet: 100,
    sumOfTax: 27,
    sumOfGross: 127,
    payStatus: 'PAYED',
    fullyPaidDate: 'string',
    paidAmount: 0,
  });
  await invoiceOfOwner.save();

  const invoiceOfCustomer = new InvoiceModel({
    externalSystemId: 'INV002',
    PartnerId: 'id of customer',
    invoiceNumber: 'invoice of customer 001',
    invoiceType: 'A/P INVOICE',
    invoiceDate: '2021.08.01',
    deliveryDate: '2021.08.01',
    paymentMethod: 'BANKTRANSFER',
    dueDate: '2021.08.01',
    customerName: 'CUSTOMER Teszt Elek',
    customerCountryCode: 'hu',
    customerPostalCode: '1111',
    customerCity: 'City',
    customerAddressDetails: '',
    customerTaxNum: 'TaxNum',
    customerGroupMemberTaxNum: 'HU-TaxNum',
    invoiceCurrency: 'HUF',
    sumOfNet: 100,
    sumOfTax: 27,
    sumOfGross: 127,
    payStatus: 'PAYED',
    fullyPaidDate: 'string',
    paidAmount: 0,
  });
  await invoiceOfCustomer.save();

  tokenOfOwner = await UserService.login(
    'owner.teszt.elek@tesztelek.hu',
    '12345678'
  );
  tokenOfCustomer = await UserService.login(
    'customer.teszt.elek@tesztelek.hu',
    '12345678'
  );
}

async function deleteTestData() {
  await UserModel.deleteOne({ name: 'OWNER Teszt Elek' });
  await UserModel.deleteOne({ name: 'CUSTOMER Teszt Elek' });
  await InvoiceModel.deleteOne({ invoiceNumber: 'invoice of owner 001' });
  await InvoiceModel.deleteOne({ invoiceNumber: 'invoice of customer 001' });
}

describe('Endpoint invoices/get', () => {
  beforeAll(async () => {
    await connectDb();
    await deleteTestData(); //if a testrun before canceled abnormaly, test data may be left behind
    await addTestData();
  });

  afterAll(async () => {
    await deleteTestData();
    await disconnect();
  });

  test('get invoices/get - owner should see all invoices', done => {
    request(app)
      .get('/invoices/get')
      .set('token', tokenOfOwner)
      .set('Content-Type', 'application/json')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.docs.length).toBeGreaterThan(1);
        return done();
      });
  });

  test('get invoices/get - owner should see only his own invoices', done => {
    request(app)
      .get('/invoices/get')
      .set('token', tokenOfCustomer)
      .set('Content-Type', 'application/json')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body.docs.length).toBe(1);
        return done();
      });
  });
});
