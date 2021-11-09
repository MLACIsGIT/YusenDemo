export default class UserLevel {
  static async add(userLevel) {
    const newUserLevel = new UserLevelModel(userLevel);
    const result = await newUserLevel.save();
    return result;
  }

  static async getByLevel(level) {
    const doc = await UserLevelModel.findOne({ level });

    if (!doc) {
      throw new Error('not found');
    }
    return doc;
  }

  static async exists(level) {
    return await UserLevelModel.findOne({ level });
  }
}
