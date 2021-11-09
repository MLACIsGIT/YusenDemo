import mssql from 'mssql';

export async function WAT_DATA_GET(portalOwnersId, userId, reportParams) {
  const sqlTop = reportParams.sqlTop ?? 0;
  const sqlRequest = new mssql.Request();
  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
  sqlRequest.input('UsersID', mssql.Int, userId);

  sqlRequest.input('TableCode', mssql.NVarChar(50), reportParams.tableCode);
  sqlRequest.input(
    'WhereQuery',
    mssql.NVarChar('max'),
    reportParams.sqlWhereQuery
  );
  sqlRequest.input('SELECT', mssql.NVarChar('max'), reportParams.sqlSelect);
  sqlRequest.input('TOP', mssql.Int, sqlTop);
  sqlRequest.input('FROM', mssql.NVarChar('max'), reportParams.sqlFrom);
  sqlRequest.input('WHERE', mssql.NVarChar('max'), reportParams.sqlWhere);
  sqlRequest.input('GROUP_BY', mssql.NVarChar('max'), reportParams.sqlGroupBy);
  sqlRequest.input('ORDER_BY', mssql.NVarChar('max'), reportParams.sqlOrderBy);
  sqlRequest.input('Lang', mssql.NVarChar(10), reportParams.language);

  sqlRequest.input('PAGE_NO', mssql.Int, reportParams.pageNo);
  sqlRequest.input('ROWS_PER_PAGE', mssql.Int, reportParams.rowsPerPage);

  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));
  let sqlResult;
  sqlResult = await sqlRequest.execute('WAT_DATA_GET');

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
