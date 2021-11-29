import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_FILESTREAM_FILE_REMOVE_DELETED(user, file) {
  console.log('+++ WAT_FILESTREAM_FILE_REMOVE_DELETED', user, file);
  const storedProcedure = new StoredProcedureCaller('WAT_FILESTREAM_FILE_REMOVE_DELETED');
  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, user.portalOwnersId);
  storedProcedure.addParameter('WAT_File_ID', TYPES.Int, file._id);
  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, {length: 'max'});

  const sqlResult = await storedProcedure.execute();
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return;
}
