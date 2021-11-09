import mssql from 'mssql';

export async function WAT_FILESTREAM_FILE_ADD(
  portalOwnersId,
  file,
  parentRecordData,
  blobData
) {
  const sqlRequest = new mssql.Request();
console.log('+++ portalOwnersId', portalOwnersId)
  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
  sqlRequest.input(
    'ExternalSystem_ID',
    mssql.BigInt,
    file.externalSystemId
  );
  sqlRequest.input(
    'ExternalSystem_TransactID',
    mssql.BigInt,
    file.externalSystemTransactId
  );
  sqlRequest.input('BLOB_Account', mssql.NVarChar(50), blobData.blobAccount);
  sqlRequest.input('BLOB_File_Path', mssql.NVarChar(255), blobData.blobPath);
  sqlRequest.input('BLOB_File_Name', mssql.NVarChar(255), blobData.blobFileName);
  sqlRequest.input(
    'BLOB_Orig_File_Name',
    mssql.NVarChar(255),
    file.originalname
  );
  sqlRequest.input(
    'BLOB_Content_Type',
    mssql.NVarChar(50),
    file.mimetype
  );
  sqlRequest.input('BLOB_File_Length', mssql.Int, file.size);

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

  sqlRequest.output('OUT_WAT_File_ID', mssql.Int);
  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  let sqlResult;
  sqlResult = await sqlRequest.execute(
    'WAT_FILESTREAM_FILE_ADD'
  );
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return sqlResult.output.OUT_WAT_File_ID;
}
