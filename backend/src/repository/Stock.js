import { StocksModel } from '../models/db/StocksModel';
import User from '../repository/User';

export default class Stock {
  static async add(stock) {
    const newStock = new StocksModel({
      externalSystemId: stock.externalSystemId,
      PartnerId: stock.PartnerId,
      ItemNo: stock.ItemNo,
      Description: stock.Description,
      ProdDate: stock.ProdDate,
      Lot: stock.Lot,
      Status: stock.Status,
      Weight: stock.Weight,
      StockAvailable: stock.StockAvailable,
      StockReserved: stock.StockReserved,
    });

    try {
      const result = await newStock.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async findOneAndUpdate(stock) {
    try {
      const filter = {
        $and: [
          { externalSystemId: stock.externalSystemId },
          { PartnerId: stock.PartnerId },
        ],
      };

      const doc = await StocksModel.findAndUpdate(filter, stock, { new: true });

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

      const docs = await StocksModel.find(filterForSelect).sort(orderBy);
      return docs;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }
}
