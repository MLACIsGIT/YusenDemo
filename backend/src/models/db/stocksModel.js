import mongoose from 'mongoose';

export const StocksModel = mongoose.model('stocks', {
    externalSystemId: {
    type: String,
    required: true,
  },

    PartnerId: {
    type: String,
    required: true,
  },

    ItemNo: {
    type: String,
    required: true,
  },

    Description: {
    type: String,
    required: true,
  },

  ProdDate: {
    type: String,
    required: true,
  },

  Lot: {
    type: String,
  },

  Status: {
    type: String,
    required: true,
    enum: ['Normal', 'Damaged']
  },

  Weight: {
    type: Number,
    required: true,
  },

  StockAvailable: {
    type: Number,
    required: true,
  },

  StockReserved: {
    type: Number,
    required: true,
  },
});
