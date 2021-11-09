import { WAT_USER_PARAMS_GET, WAT_DATA_GET } from '../db/storedProcedures';

export default class Data {
  static async getDocs(portalOwnersId, userId, reportParams) {
    const docs = await WAT_DATA_GET(portalOwnersId, userId, reportParams);
    return docs;
  }

  static async getReportParams(
    portalOwnersId,
    userId,
    reportId,
    language,
    where
  ) {
    const params = await WAT_USER_PARAMS_GET(portalOwnersId, userId);

    let reportParamsOwnerLevel = params?.portalOwnerParams?.gridReports;
    let reportParamsUserLevel = params?.userLevelParams?.gridReports;
    let reportParamsUser = params?.userParams?.gridReports;

    reportParamsOwnerLevel = reportParamsOwnerLevel
      ? reportParamsOwnerLevel[reportId] || {}
      : {};
    reportParamsUserLevel = reportParamsUserLevel
      ? reportParamsUserLevel[reportId] || {}
      : {};
    reportParamsUser = reportParamsUser ? reportParamsUser[reportId] || {} : {};

    const reportParams = {
      language: language ? language : 'en',
      columns: reportParamsUserLevel.columns || reportParamsOwnerLevel.columns,
      sqlSelect: (
        reportParamsUser.selectedColumns ||
        reportParamsUserLevel.selectedColumns ||
        reportParamsOwnerLevel.selectedColumns
      ).join(),
      sqlTop:
        reportParamsUser.sqlTop ||
        reportParamsUserLevel.sqlTop ||
        reportParamsOwnerLevel.sqlTop,
      sqlFrom: reportParamsOwnerLevel.sqlFrom,
      sqlWhere: where,
      tableCode: reportParamsOwnerLevel.tableCode,
      filters: reportParamsUserLevel.filters || reportParamsOwnerLevel.filters,
      sqlOrderBy:
        reportParamsUser.orderBy ||
        reportParamsUserLevel.orderBy ||
        reportParamsOwnerLevel.orderBy,
      rowCountPerPage:
        reportParamsUser.rowCountPerPage ||
        reportParamsUserLevel.rowCountPerPage ||
        reportParamsOwnerLevel.rowCountPerPage,
      selectedFilters:
        reportParamsUser.selectedFilters ||
        reportParamsUserLevel.selectedFilters ||
        reportParamsOwnerLevel.selectedFilters,
      selectedColumns:
        reportParamsUser.selectedColumns ||
        reportParamsUserLevel.selectedColumns ||
        reportParamsOwnerLevel.selectedColumns,
    };

    return reportParams;
  }
}
