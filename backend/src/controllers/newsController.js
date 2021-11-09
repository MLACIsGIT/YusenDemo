import { NewsService } from '../services';

export const newsController = {
  async getList(req, res, next) {
    try {
      const result = await NewsService.getList(
        req.headers.portalownersid,
        req.headers.language,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const result = await NewsService.getAll(
        req.verified.portalOwnersId,
        req.headers.language,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      let result;
      result = await NewsService.get(req.verified.portalOwnersId, req.headers.id);
      res.status(200).json(result);
    } catch (error) {
        error.status=400
        error.message='not found'
      next(error);
    }
  },

  async put(req, res, next) {
      try {
          let result;
          result = await NewsService.put(req.verified.portalOwnersId, req.body);
          res.status(200).json(result);
      } catch (error) {
          next(error);
      }
  },

  async delete(req, res, next) {
      try {
          await NewsService.delete(req.verified.portalOwnersId, req.headers.id);
          res.status(200).json({});
      } catch (error) {
          next(error);
      }
  }
};
