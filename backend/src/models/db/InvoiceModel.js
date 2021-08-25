
import mongoose from 'mongoose';
import Validators from '../../controllers/validators/Validators';

export const InvoiceModel = mongoose.model('Invoices', {
  externalSystemId: {
    type: String,
    validator: Validators.isTrimOk,
    message: 'Field ExternalSystemId cannot begin / end with a space',
  },

  PartnerId: {
    type: String,
    validator: Validators.isTrimOk,
    message: 'Field ExternalSystemTransactId cannot begin / end with a space',
  },

  invoiceNumber: {
    type: String,
    required: true,
  },

  invoiceType: {
    type: String,
    required: true,
    enum: ['A/P INVOICE', 'A/R INVOICE', 'CREDIT NOTE', 'A/R CREDIT NOTE'],
  },

  invoiceDate: {
    type: String,
    required: true,
  },

  deliveryDate: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ['CASH', 'BANKTRANSFER'],
  },

  dueDate: {
    type: String,
    required: true,
  },

  customerName: {
    type: String,
    required: true,
  },

  customerCountryCode: {
    type: String,
  },

  customerPostalCode: {
    type: String,
  },

  customerCity: {
    type: String,
  },

  customerAddressDetails: {
    type: String,
  },

  customerTaxNum: {
    type: String,
  },

  customerGroupMemberTaxNum: {
    type: String,
  },

  invoiceCurrency: {
    type: String,
    required: true,
  },

  sumOfNet: {
    type: Number,
    required: true,
  },

  sumOfTax: {
    type: Number,
    required: true,
  },

  sumOfGross: {
    type: Number,
    required: true,
  },

  payStatus: {
    type: String,
    required: true,
    enum: ['NOT PAYED', 'PAYED', 'CONSIDERED AS PAID'],
  },

  fullyPaidDate: {
    type: String,
  },

  paidAmount: {
    type: Number,
    required: true,
  },
});
