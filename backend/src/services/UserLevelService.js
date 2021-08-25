import UserLevel from '../repository/UserLevel';

export class UserLevelService {
  static async add(props) {
    const userLevel = {
      level: props.level,
      params: props.params,
    };

    let result;

    result = await UserLevel.exists(userLevel.level);

    if (result) {
      throw new Error('UserLevel already exists');
    }

    result = UserLevel.add(userLevel);

    return result;
  }

  static async get(level) {
    return await UserLevel.getByLevel(level);
  }
}
