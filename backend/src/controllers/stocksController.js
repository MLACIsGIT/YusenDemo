import { StockService } from '../services';

export const stocksController = {
        async upload(req, res, next) {
        try {
          const result = await StockService.upload(req.body);
          res.status(200).json({result});
        } catch (error) {
          next(error);
        }
      },
    
      async get(req, res, next) {
        try {
          const docs = await StockService.get(req.headers.filters, req.headers.orderBy, req.verified.id);
          res.status(200).json({docs});
        } catch (error) {
          next(error);
        }
      }
    };
    