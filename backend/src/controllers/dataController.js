import { DataService } from '../services';

export const dataController = {
  async get(req, res, next) {
    try {
      const docs = await DataService.get(
        req.verified.portalOwnersId,
        req.verified.id,
        req.headers.language,
        req.headers.reportid,
        req.headers.filters,
        req.headers.orderBy
      );
      res.status(200).json({ docs });
    } catch (error) {
      next(error);
    }
  },

  async getReportParams(req, res, next) {
    try {
      const params = await DataService.getPublicReportParams(req.verified.portalOwnersId, req.verified.id, req.headers.reportid);
      res.status(200).json(params);
    } catch (error) {
      next(error);
    }
  }
};
