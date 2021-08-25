import bcrypt from 'bcryptjs';

export default class Hash {
  static async getHash(text) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(text, salt);

    return hash;
  }

  static async compare(plainText, hash) {
    const result = bcrypt.compareSync(plainText, hash);

    return result;
  }
}
