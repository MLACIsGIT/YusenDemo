import { sign, verify } from 'jsonwebtoken';

export default class Token {
  static get(type, userId, user) {
    const currentDate = new Date();
    let valid;

    switch (type) {
      case 'REGISTRATION':
        valid = currentDate.getTime() + 6220800000; // 3 days
        break;

      case 'LOGIN':
        valid = currentDate.getTime() + 900000; // 15 minutes
        break;

      default:
        throw new Error('Unknown token type');
    }

    return sign(
      {
        id: userId,
        userLevel: user.userLevel,
        name: user.name,
        email: user.email,
        type,
        valid,
      },
      process.env.JWT_KEY
    );
  }

  static verify(token) {
    const extractedToken = verify(token, process.env.JWT_KEY);
    const currentDate = new Date();

    if (extractedToken.valid < currentDate.getTime()) {
      throw new Error('invalid');
    }

    return extractedToken;
  }
}
