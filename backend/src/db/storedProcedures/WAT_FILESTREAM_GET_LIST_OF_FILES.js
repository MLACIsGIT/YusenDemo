import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_FILESTREAM_GET_LIST_OF_FILES(user, parentRecordData) {
    console.log('+++ WAT_FILESTREAM_GET_LIST_OF_FILES', user, parentRecordData)
  const storedProcedure = new StoredProcedureCaller('WAT_FILESTREAM_GET_LIST_OF_FILES');
  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, user.portalOwnersId);
  storedProcedure.addParameter('Parent_TableCode', TYPES.NVarChar, parentRecordData.tableCode, {length: 50});
  storedProcedure.addParameter('Parent_ExternalSystem_ID', TYPES.BigInt, parentRecordData.externalSystemId);
  storedProcedure.addOutputParameter('OUT_DATA', TYPES.NVarChar, '', {length: 'max'});
  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});

  const sqlResult = await storedProcedure.execute();
  
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
