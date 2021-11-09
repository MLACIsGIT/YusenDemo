import mssql from 'mssql';

export async function WAT_FILESTREAM_GET_LIST_OF_FILES(user, parentRecordData) {
    console.log('+++ WAT_FILESTREAM_GET_LIST_OF_FILES', user, parentRecordData)
  const sqlRequest = new mssql.Request();
  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, user.portalOwnersId);
  sqlRequest.input('Parent_TableCode', mssql.NVarChar(50), parentRecordData.tableCode);
  sqlRequest.input('Parent_ExternalSystem_ID', mssql.BigInt, parentRecordData.externalSystemId);
  sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));
  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  const sqlResult = await sqlRequest.execute('WAT_FILESTREAM_GET_LIST_OF_FILES');
  
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
