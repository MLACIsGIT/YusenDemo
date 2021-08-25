import Email from '../repository/Email';
import User from '../repository/User';
import Hash from '../repository/Hash';
import Token from '../repository/Token';

export class UserService {
  static async register(props) {
    const user = {
      localSystemId: props.user.localSystemId,
      name: props.user.name,
      email: props.user.email.toLowerCase().trim(),
      userLevel: props.user.userLevel,
      language: props.user.language,
    };

    let dbResult;

    try {
      dbResult = await User.getByEmail(user.email);

      if (dbResult) {
        const error = new Error('user-already-exists');
        error.status = 406;
        throw error;
      }

      dbResult = await User.add(user);

      const email = new Email(dbResult);
      const result = await email.sendRegistrationEmail();

      return result;
    } catch (error) {
      error.httpCode = 400;
      throw error;
    }
  }

  static async dismissRegistration(id) {
    let dbResult;

    dbResult = await User.getById(id);

    if (!dbResult || dbResult.status !== 'NOT ACCEPTED') {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }

    await User.deleteById(id);
  }

  static async import(user) {
    await User.import(user);
  }

  static async get(id) {
    let dbResult;

    dbResult = await User.getById(id);

    if (!dbResult) {
      const error = new Error('invalid');
      error.status = 410;
      throw error;
    }

    delete dbResult['passHash'];

    return dbResult;
  }

  static async put(id, user) {
    if (user.password) {
      user.passHash = await Hash.getHash(user.password);
      delete user['password'];
    }

    await User.update(id, user);
    return {};
  }

  static async putAndLogin(id, user) {
    const password = user.password;
    let token;
    await UserService.put(id, user);
    token = await UserService.login(user.email, password);
    return token;
  }

  static async login(email, password) {
    let dbResult;
    dbResult = await User.getByEmail(email);

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
    return Token.get('LOGIN', dbResult._id, dbResult);
  }

  static async extendTokenValidity(id) {
    let user = await User.getById(id);
    return Token.get('LOGIN', id, user);
  }
}
