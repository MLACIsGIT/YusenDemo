import mssql from 'mssql';

export async function WAT_FILESTREAM_FILE_SET_DELETED(
  portalOwnersId,
  origFileName,
  parentRecordData
) {
  const sqlRequest = new mssql.Request();
  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
  sqlRequest.input(
    'Parent_TableCode',
    mssql.NVarChar(50),
    parentRecordData.tableCode
  );
  sqlRequest.input(
    'Parent_ExternalSystem_ID',
    mssql.BigInt,
    parentRecordData.externalSystemId
  );
  sqlRequest.input('Orig_File_Name', mssql.NVarChar(255), origFileName);

  sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));

  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  const sqlResult = await sqlRequest.execute('WAT_FILESTREAM_FILE_SET_DELETED');
  if (
    sqlResult.output.OUT_HTTP_Code === 400 &&
    sqlResult.output.OUT_HTTP_Message === 'Not found'
  ) {
    return;
  }

  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
