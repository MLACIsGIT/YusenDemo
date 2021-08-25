import * as gl from "./globals";

export default class Cookies {
  static get() {
    let out = document.cookie;

    if (!out) {
      return {};
    }

    out = document.cookie.split(";").map((c) => c.split("="));
    out = JSON.stringify(out);
    out = gl.replaceAll(out, '[" ', '["');
    out = gl.replaceAll(out, '","', '": "');
    out = gl.replaceAll(out, "],[", ", ");
    out = gl.replaceAll(out, "[[", "{");
    out = gl.replaceAll(out, "]]", "}");
    out = JSON.parse(out);

    return out;
  }

  static set(key, value, expireDateUTC) {
    if (!key) {
      return;
    }

    document.cookie = `${key}=${gl.isNull(value).trim()}; expires=${
      !expireDateUTC ? new Date(2050, 0, 1).toUTCString() : expireDateUTC
    };path=/`;
  }

  static remove(key) {
    if (!key) {
      return;
    }

    document.cookie =
      `${key}=''; expires=` + new Date(2001, 0, 1).toUTCString();
  }
}
