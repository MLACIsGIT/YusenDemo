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
      await UserService.dismissRegistration(req.verified.id);
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      let result;
      result = await UserService.get(req.verified.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async put(req, res, next) {
    try {
      let result;
      result = await UserService.put(req.verified.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async putAndLogin(req, res, next) {
    try {
      let token;
      token = await UserService.putAndLogin(req.verified.id, req.body);
      res.status(200).json({
        token
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      let token = await UserService.login(req.body.email, req.body.password);
      res.status(200).json({
        token,
      });
    } catch (error) {
      error.status = 410;
      next(error);
    }
  },

  async extendTokenValidity(req, res, next) {
    try {
      let token = await UserService.extendTokenValidity(req.verified.id);
      res.status(200).json({
        token,
      });
    } catch (error) {
      error.status = 410;
      next(error);      
    }
  }
};
