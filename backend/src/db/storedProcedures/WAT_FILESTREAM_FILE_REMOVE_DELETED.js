import mssql from 'mssql';

export async function WAT_FILESTREAM_FILE_REMOVE_DELETED(user, file) {
  console.log('+++ WAT_FILESTREAM_FILE_REMOVE_DELETED', user, file);
  const sqlRequest = new mssql.Request();
  sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, user.portalOwnersId);
  sqlRequest.input('WAT_File_ID', mssql.Int, file._id);
  sqlRequest.output('OUT_HTTP_Code', mssql.Int);
  sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));

  const sqlResult = await sqlRequest.execute(
    'WAT_FILESTREAM_FILE_REMOVE_DELETED'
  );
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return;
}
