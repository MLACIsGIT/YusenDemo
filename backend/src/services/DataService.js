import Data from '../repository/Data';

export class DataService {
  static async get(portalOwnersId, userId, language, reportId, filters, orderBy) {
    const reportParams = await Data.getReportParams(portalOwnersId, userId, reportId, language, filters);
    const docs = await Data.getDocs(portalOwnersId, userId, reportParams, filters, orderBy);
    return docs;
  }

  static async getPublicReportParams(portalOwnersId, userId, reportId) {
    const reportParams = await Data.getReportParams(portalOwnersId, userId, reportId);    
    const params = {
      columns: reportParams.columns,
      sqlOrderBy: reportParams.sqlOrderBy,
      rowCountPerPage: reportParams.rowCountPerPage,
      selectedFilters: reportParams.selectedFilters,
      selectedColumns: reportParams.selectedColumns,
    }
    return params;
  }
}
