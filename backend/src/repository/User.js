import { UserModel } from '../models/db';
import Hash from '../repository/Hash';

export default class User {
  static async import(user) {
    const password = (user.password) ? user.password : '12345678';
    const passHash = await Hash.getHash( password );

    const newUser = new UserModel({
      localSystemId: user.localSystemId,
      name: user.name,
      email: user.email,
      status: user.status,
      passHash: passHash,
      userLevel: user.userLevel,
      language: user.language,
    });

    try {
      const result = await newUser.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async add(user) {
    const newUser = new UserModel({
      localSystemId: user.localSystemId,
      name: user.name,
      email: user.email,
      status: 'NOT ACCEPTED',
      userLevel: user.userLevel,
      language: user.language,
    });

    try {
      const result = await newUser.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async getByEmail(email) {
    let result = await UserModel.findOne({ email });

    return result;
  }

  static async getById(id) {
    return await UserModel.findOne({ _id: id });
  }

  static async deleteByEmail(email) {
    await UserModel.deleteOne({ email });
  }

  static async deleteById(id) {
    await UserModel.deleteOne({ _id: id });
  }

  static async update(id, user) {
    await UserModel.findByIdAndUpdate(id, user);
  }
}
