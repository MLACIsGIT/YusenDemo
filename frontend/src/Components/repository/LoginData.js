import { parseJwt } from "../repository/jwt";

export default class LoginData {
  constructor(token) {
    if (!token) {
      this.token = null
      this.tokenData = {
        user: {
          name: null,
          email: null,
          userLevel: "GUEST",
        }
      }

      return;
    }

    this.token = token;
    this.tokenData = this.getDataFromToken();
  }

  getDataFromToken() {
    if (!this.token) {
      return null;
    }

    const tokenData = parseJwt(this.token);
    return {
      user: {
        name: tokenData.name,
        email: tokenData.email,
        userLevel: tokenData.userLevel,
      },
      token: {
        token: this.token,
        valid: tokenData.valid,
      },
    };
  }

  get() {
    return this.tokenData;
  }

  getToken() {
    return this.token;
  }

  getUserLevel() {
    return this.tokenData?.user?.userLevel;
  }
}
