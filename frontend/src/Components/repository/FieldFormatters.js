export default class FieldFormatters {
  static dateFormatter(value, lang) {
    if (!value) {
      return "";
    }

    let yearStr = value.substr(0, 4);
    let monthStr = value.substr(5, 2);
    let dayStr = value.substr(8, 2);
    switch (lang) {
      case "hu":
        return `${yearStr}.${monthStr}.${dayStr}`;

      case "en":
        return `${monthStr}.${dayStr}.${yearStr}`;

      default:
        return `${dayStr}.${monthStr}.${yearStr}`;
    }
  }

  static onlyDate(value) {
    if (!value) {
      return null;
    }

    let yearStr = value.substr(0, 4);
    let monthStr = value.substr(5, 2);
    let dayStr = value.substr(8, 2);
    return `${yearStr}-${monthStr}-${dayStr}`;
  }

  static numberFormatter(value, lang, numberOfDigits) {
    if (isNaN(value)) {
      return "";
    }

    const formattedValue = new Intl.NumberFormat(lang, {
      minimumFractionDigits: numberOfDigits,
      maximumFractionDigits: numberOfDigits,
    }).format(value);

    return formattedValue;
  }
}
