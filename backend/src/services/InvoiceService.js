import Invoice from '../repository/Invoice';

export class InvoiceService {
  static async upload(invoice) {
    let result;
    try {
      result = await Invoice.findOneAndUpdate(invoice);
    } catch (error) {
      result = await Invoice.add(invoice);
    }
    return result;
  }

  static async get(filters, orderBy, userId) {
    const docs = await Invoice.getDocs(filters, orderBy, userId);
    return docs;
  }
}
