import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_DATA_GET(portalOwnersId, userId, reportParams) {
  const sqlTop = reportParams.sqlTop ?? 0;
  const storedProcedure = new StoredProcedureCaller('WAT_DATA_GET');
  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
  storedProcedure.addParameter('UsersID', TYPES.Int, userId);

  storedProcedure.addParameter('TableCode', TYPES.NVarChar, reportParams.tableCode);
  storedProcedure.addParameter(
    'WhereQuery',
    TYPES.NVarChar,
    reportParams.sqlWhereQuery
  );
  storedProcedure.addParameter('SELECT', TYPES.NVarChar, reportParams.sqlSelect, {length: 'max'});
  storedProcedure.addParameter('TOP', TYPES.Int, sqlTop);
  storedProcedure.addParameter('FROM', TYPES.NVarChar, reportParams.sqlFrom, {length: 'max'});
  storedProcedure.addParameter('WHERE', TYPES.NVarChar, reportParams.sqlWhere, {length: 'max'});
  storedProcedure.addParameter('GROUP_BY', TYPES.NVarChar, reportParams.sqlGroupBy, {length: 'max'});
  storedProcedure.addParameter('ORDER_BY', TYPES.NVarChar, reportParams.sqlOrderBy, {length: 'max'});
  storedProcedure.addParameter('Lang', TYPES.NVarChar, reportParams.language, {length: 10});

  storedProcedure.addParameter('PAGE_NO', TYPES.Int, reportParams.pageNo);
  storedProcedure.addParameter('ROWS_PER_PAGE', TYPES.Int, reportParams.rowsPerPage);

  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});
  let sqlResult;
  sqlResult = await storedProcedure.execute();

  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return {
    columns: sqlResult.recordset['columns'],
    data: sqlResult.recordset,
  };
}
