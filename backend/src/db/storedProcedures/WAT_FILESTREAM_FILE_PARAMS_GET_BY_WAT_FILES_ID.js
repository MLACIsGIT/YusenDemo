import mssql from 'mssql';

export async function WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID(portalOwnersId, fileId) {
    const sqlRequest = new mssql.Request();

    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
    sqlRequest.input('WAT_Files_ID', mssql.Int, fileId);

    sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));

    sqlRequest.output('OUT_HTTP_Code', mssql.Int);
    sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));
  
    let sqlResult;
    sqlResult = await sqlRequest.execute('WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID');
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return JSON.parse(sqlResult.output.OUT_DATA);
}
