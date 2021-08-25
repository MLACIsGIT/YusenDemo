import Validators from './Validators';

export default class UserValidators extends Validators {
  static isTrueIfAccepted(value) {
    return this.status === 'NOT ACCEPTED' || value;
  }

  static isFilledIfCustomer(value) {
    return this.userLevel !== 'CUSTOMER' || value;
  }

  static isPassHashOk(value) {
    if (!UserValidators.isTrueIfAccepted) {
      return false;
    }

    return value.length >= 8;
  }
}
