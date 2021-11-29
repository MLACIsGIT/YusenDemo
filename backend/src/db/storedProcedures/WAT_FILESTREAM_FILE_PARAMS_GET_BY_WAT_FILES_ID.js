import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID(portalOwnersId, fileId) {
    const storedProcedure = new StoredProcedureCaller('WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID');

    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
    storedProcedure.addParameter('WAT_Files_ID', TYPES.Int, fileId);

    storedProcedure.addOutputParameter('OUT_DATA', TYPES.NVarChar, '', {length: 'max'});

    storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
    storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});
  
    let sqlResult;
    sqlResult = await storedProcedure.execute();
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return JSON.parse(sqlResult.output.OUT_DATA);
}
