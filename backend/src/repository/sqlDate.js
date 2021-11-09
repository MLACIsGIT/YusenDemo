export const sqlDate = {
  getSqlFormattedDate(date) {
    if (!date) {
      return 'NULL';
    }

    return `CONVERT(DATETIME, '${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}', 102)`;
  },

  getSqlFormattedDateTime(date) {
    if (!date) {
      return 'NULL';
    }

    return `CONVERT(DATETIME, '${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}.${date.getSeconds()}', 20)`;
  }
};
