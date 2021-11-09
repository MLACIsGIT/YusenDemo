import mssql from 'mssql';

export async function WAT_USER_PARAMS_GET(portalOwnersId, userId) {
  const sqlRequest = new mssql.Request();

  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
  sqlRequest.input('UsersID', mssql.Int, userId);

  sqlRequest.output('OUT_User_Params', mssql.NVarChar('max'));
  sqlRequest.output('OUT_UserLevel_Params', mssql.NVarChar('max'));
  sqlRequest.output('OUT_Portal_Owners_Params', mssql.NVarChar('max'));

  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  let sqlResult;
  sqlResult = await sqlRequest.execute('WAT_USER_PARAMS_GET');

  return {
    userParams: JSON.parse(sqlResult.output.OUT_User_Params),
    userLevelParams: JSON.parse(sqlResult.output.OUT_UserLevel_Params),
    portalOwnerParams: JSON.parse(sqlResult.output.OUT_Portal_Owners_Params),
  };
}
