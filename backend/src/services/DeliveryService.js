import Delivery from '../repository/Delivery';

export class DeliveryService {
  static async upload(delivery) {
    let result;
    try {
      result = await Delivery.findOneAndUpdate(delivery);
    } catch (error) {
      result = await Delivery.add(delivery);
    }
    return result;
  }

  static async get(filters, orderBy, userId) {
    const docs = await Delivery.getDocs(filters, orderBy, userId);
    return docs;
  }
}
