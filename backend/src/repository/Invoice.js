import { InvoiceModel } from '../models/db/InvoiceModel';
import User from '../repository/User';

export default class Invoice {
  static async add(invoice) {
    const newInvoice = new InvoiceModel(invoice);

    try {
      const result = await newInvoice.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async findOneAndUpdate(invoice) {
    try {
      const filter = {
        $and: [
          { externalSystemId: invoice.externalSystemId },
          { PartnerId: invoice.PartnerId },
        ],  
      }

      const doc = await InvoiceModel.findOneAndUpdate(filter, invoice, {new: true});

      if (!doc) {
        const error = new Error('not found');
        error.status = 400;
        throw error;
      }

      return doc;

    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async getDocs(filters, orderBy, userId) {
    try {
      const user = await User.getById(userId);
      let filterForSelect = JSON.parse( filters ?? '{}' );

      if (user.userLevel !== 'OWNER_SA') {
        if (!filterForSelect['$and']) {
          filterForSelect = { 'PartnerId': user.localSystemId }
        } else {
          filterForSelect['$and'] = [...filterForSelect['$and'], {'PartnerId': user.localSystemId}]
        }
      }

      const docs = await InvoiceModel.find(filterForSelect);
      return docs;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }
}
