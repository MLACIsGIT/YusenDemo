import Stock from '../repository/Stock';

export class StockService {
  static async upload(stock) {
    let result;
    try {
      result = await Stock.findOneAndUpdate(stock);
    } catch (error) {
      result = await Stock.add(stock);
    }
    return result;
  }

  static async get(filters, orderBy, userId) {
    const docs = await Stock.getDocs(filters, orderBy, userId);
    return docs;
  }
}
