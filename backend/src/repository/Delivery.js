import { DeliveriesModel } from '../models/db/DeliveriesModel';
import User from '../repository/User';

export default class Delivery {
  static async add(delivery) {
    const newDelivery = new DeliveriesModel({
      externalSystemId: delivery.externalSystemId,
      PartnerId: delivery.PartnerId,
      OrderNo: delivery.OrderNo,
      PurchaseOrderNo: delivery.PurchaseOrderNo,
      LoadingPlace: delivery.LoadingPlace,
      LoadingDate: delivery.LoadingDate,
      UnloadingPlace: delivery.UnloadingPlace,
      UnloadingDate: delivery.UnloadingDate,
      Status: delivery.Status,  
    });

    try {
      const result = await newDelivery.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async findOneAndUpdate(delivery) {
    try {
      const filter = {
        $and: [
          { externalSystemId: delivery.externalSystemId },
          { PartnerId: delivery.PartnerId },
        ],
      };

      const doc = await DeliveriesModel.findAndUpdate(filter, delivery, { new: true });

      if (!doc) {
        const error = new Error('not found');
        error.status = 400;
        throw error;
      }
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async getDocs(filters, orderBy, userId) {
    console.log('+++ filters', filters)
    try {
      const user = await User.getById(userId);
      let filterForSelect = JSON.parse(filters ?? '{}');

      if (user.userLevel !== 'OWNER_SA') {
        if (!filterForSelect['$and']) {
          filterForSelect = { PartnerId: user.localSystemId };
        } else {
          filterForSelect['$and'] = [
            ...filterForSelect['$and'],
            { PartnerId: user.localSystemId },
          ];
        }
      }

      const docs = await DeliveriesModel.find(filterForSelect).sort(orderBy);
      return docs;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }
}
