import mongoose from 'mongoose';

export const DeliveriesModel = mongoose.model('deliveries', {
  externalSystemId: {
    type: String,
    required: true,
  },

  PartnerId: {
    type: String,
    required: true,
  },

  OrderNo: {
    type: String,
    required: true,
  },

  PurchaseOrderNo: {
    type: String,
  },

  LoadingPlace: {
    type: String,
  },

  LoadingDate: {
    type: String,
  },

  UnloadingPlace: {
    type: String,
  },

  UnloadingDate: {
    type: String,
  },

  Status: {
    type: String,
    required: true,
    enum: ['NOT DELIVERED', 'DELIVERED', 'IN-PROGRESS'],
  },
});
