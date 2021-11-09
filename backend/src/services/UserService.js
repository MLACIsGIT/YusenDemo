import Email from '../repository/Email';
import User from '../repository/User';
import Hash from '../repository/Hash';
import Token from '../repository/Token';

export class UserService {
  static async register(props) {
    const user = {
      portalOwnersId: props.user.portalOwnersId,
      localSystemId: props.user.localSystemId,
      name: props.user.name,
      email: props.user.email.toLowerCase().trim(),
      userLevel: props.user.userLevel,
      language: props.user.language,
    };

    let dbResult;

    dbResult = await User.register(user);

    const email = new Email(dbResult);
    const result = await email.sendRegistrationEmail();

    return result;
  }

  static async dismissRegistration(portalOwnersId, id) {
    let dbResult;

    dbResult = await User.getById(portalOwnersId, id);
    if (!dbResult || dbResult.status !== 'NOT ACCEPTED') {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }

    await User.deleteById(portalOwnersId, id);
  }

  static async import(user) {
    await User.import(user);
  }

  static async get(portalOwnersId, id) {
    let dbResult;

    dbResult = await User.getById(portalOwnersId, id);

    if (!dbResult) {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }

    dbResult.passHash = undefined;

    return dbResult;
  }

  static async getByLocalsystemId(portalOwnersId, localsystemId) {
    let dbResult;

    dbResult = await User.getByLocalsystemId(portalOwnersId, localsystemId);

    if (!dbResult) {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }
    dbResult.passHash = undefined;

    return dbResult;
  }

  static async put(user) {
    if (user.password) {
      user.passHash = await Hash.getHash(user.password);
      delete user.password;
    }

    let dbResult;
    dbResult = await User.update(user);

    return dbResult;
  }

  static async putAndLogin(user) {
    const password = user.password;
    let token;
    await UserService.put(user);
    token = await UserService.login(user.portalOwnersId, user.email, password);
    return token;
  }

  static async login(portalOwnersId, email, password) {
    let dbResult;
    dbResult = await User.getByEmail(portalOwnersId, email);
    if (!dbResult || dbResult.status !== 'ACTIVE') {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }

    let passwordOk = await Hash.compare(password, dbResult.passHash);
    if (!passwordOk) {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }
    return Token.get('LOGIN', dbResult);
  }

  static async extendToken(portalOwnersId, id) {
    let user = await User.getById(portalOwnersId, id);
    return Token.get('LOGIN', user);
  }
}
