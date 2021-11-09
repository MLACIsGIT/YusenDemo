import mssql from 'mssql';

export async function WAT_USER_REGISTER(user) {
  const sqlRequest = new mssql.Request();

  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, user.portalOwnersId);
  sqlRequest.input('WAT_Portal_Owners_Partner_ID', mssql.NVarChar(50), user.localSystemId);
  sqlRequest.input('UserLevels_Code', mssql.NVarChar(20), user.userLevel);
  sqlRequest.input('Name', mssql.NVarChar(100), user.name);
  sqlRequest.input('Lang', mssql.NVarChar(3), user.language);
  sqlRequest.input('Email', mssql.NVarChar(128), user.email);

  sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));
  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  let sqlResult;

  sqlResult = await sqlRequest.execute('WAT_USER_REGISTER');

  if (sqlResult.output.OUT_HTTP_Code !== 200) {
      const error = new Error( sqlResult.output.OUT_HTTP_Message );
      error.status = sqlResult.output.OUT_HTTP_Code;

      throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
