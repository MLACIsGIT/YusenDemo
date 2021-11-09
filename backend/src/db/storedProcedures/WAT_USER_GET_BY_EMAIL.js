import mssql from 'mssql';

export async function WAT_USER_GET_BY_EMAIL(portalOwnersId, email) {
  const sqlRequest = new mssql.Request();

  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
  sqlRequest.input('email', mssql.NVarChar(50), email);

  sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));
  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  let sqlResult;
  sqlResult = await sqlRequest.execute('WAT_USER_GET_BY_EMAIL');

  return JSON.parse(sqlResult.output.OUT_DATA);
}
