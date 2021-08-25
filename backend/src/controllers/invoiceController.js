import { InvoiceService } from '../services';

export const invoiceController = {
  async upload(req, res, next) {
    try {
      const result = await InvoiceService.upload(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      const docs = await InvoiceService.get(req.headers.filters, req.headers.orderBy, req.verified.id);
      res.status(200).json({docs});
    } catch (error) {
      next(error);
    }
  }
};
