import { UserService } from '../services';

export const userController = {
  async register(req, res, next) {
    try {
      const result = await UserService.register(req.body);
      res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  },

  async dismissRegistration(req, res, next) {
    try {
      await UserService.dismissRegistration(
        req.verified.portalOwnersId,
        req.verified.id
      );
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  },

  async extendToken(req, res, next) {
    try {
      let token = await UserService.extendToken(
        req.verified.portalOwnersId,
        req.verified.id
      );
      res.status(200).json({
        token,
      });
    } catch (error) {
      error.status = 410;
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      let result;
      result = await UserService.get(
        req.verified.portalOwnersId,
        req.verified.id
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getByLocalsystemId(req, res, next) {
    try {
      let result;
      result = await UserService.getByLocalsystemId(req.headers.localsystemid);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async put(req, res, next) {
    try {
      let result;
      result = await UserService.put({
        _id: req.verified.id,
        portalOwnersId: req.verified.portalOwnersId,
        name: req.body.name,
        email: req.body.email,
        emailAnnouncementsAccepted: req.body.emailAnnouncementsAccepted,
        newsletterAccepted: req.body.newsletterAccepted,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async putAndLogin(req, res, next) {
    try {
      let token = await UserService.putAndLogin({
        portalOwnersId: req.verified.portalOwnersId,
        _id: req.verified.id,
        userLevel: req.verified.userLevel,
        status: 'ACTIVE',
        ...req.body,
      });

      res.status(200).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      let token = await UserService.login(
        req.body.portalOwnersId,
        req.body.email,
        req.body.password
      );
      res.status(200).json({
        token,
      });
    } catch (error) {
      error.status = 410;
      next(error);
    }
  },
};
