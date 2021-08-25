import validator from 'validator';

export default class Validators {
  static isNotEmpty(value) {
    return (value > '');
  }

  static noSpaces(value) {
    if (!Validators.isNotEmpty(value)) {
      return true;
    }

    return value.indexOf(' ') === -1;
  }

  static isTrimOk(value) {
    if (!Validators.isNotEmpty(value)) {
      return true;
    }

    return value.substr(0, 1) !== ' ' && value.substr(-1) !== ' ';
  }

  static isEmail(value) {
    return validator.isEmail(value);
  }

  static isUrl(value) {
    return validator.isURL(value);
  }
}
