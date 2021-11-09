import {
  WAT_USER_IMPORT,
  WAT_USER_REGISTER,
  WAT_USER_GET_BY_ID,
  WAT_USER_GET_BY_EMAIL,
  WAT_USER_GET_BY_LOCALSYSTEMID,
  WAT_USER_DELETE_BY_EMAIL,
  WAT_USER_DELETE_BY_ID,
  WAT_USER_UPDATE,
} from '../db/storedProcedures';
import Hash from '../repository/Hash';

export default class User {
  static async import(user) {
    const password = user.password ? user.password : '12345678';
    const passHash = await Hash.getHash(password);

    const newUser = {
      localSystemId: user.localSystemId,
      name: user.name,
      email: user.email,
      status: user.status,
      passHash: passHash,
      userLevel: user.userLevel,
      language: user.language,
    };

    try {
      const result = await WAT_USER_IMPORT(newUser);
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async getByEmail(portalOwnersId, email) {
    let result = await WAT_USER_GET_BY_EMAIL(portalOwnersId, email);
    return result;
  }

  static async getById(portalOwnersId, id) {
    let result = await WAT_USER_GET_BY_ID(portalOwnersId, id);
    return result;
  }

  static async getByLocalsystemId(portalOwnersId, localsystemId) {
    let result = await WAT_USER_GET_BY_LOCALSYSTEMID(portalOwnersId, localsystemId);
    return result;
  }

  static async deleteByEmail(portalOwnersId, email) {
    await WAT_USER_DELETE_BY_EMAIL(portalOwnersId, email);
  }

  static async deleteById(portalOwnersId, id) {
    await WAT_USER_DELETE_BY_ID(portalOwnersId, id);
  }

  static async register(user) {
    let result = await WAT_USER_REGISTER(user);
    return result;
  }

  static async update(user) {
    let result = await WAT_USER_UPDATE(user);
    return result;
  }
}
