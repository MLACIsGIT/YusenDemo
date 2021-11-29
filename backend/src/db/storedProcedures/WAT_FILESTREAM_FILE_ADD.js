import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_FILESTREAM_FILE_ADD(
  portalOwnersId,
  file,
  parentRecordData,
  blobData
) {
  const storedProcedure = new StoredProcedureCaller('WAT_FILESTREAM_FILE_ADD');
  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
  storedProcedure.addParameter('ExternalSystem_ID', TYPES.BigInt, file.externalSystemId);
  storedProcedure.addParameter('ExternalSystem_TransactID', TYPES.BigInt, file.externalSystemTransactId);
  storedProcedure.addParameter('BLOB_Account', TYPES.NVarChar, blobData.blobAccount, { length: 50 });
  storedProcedure.addParameter('BLOB_File_Path', TYPES.NVarChar, blobData.blobPath, { length: 255 });
  storedProcedure.addParameter('BLOB_File_Name', TYPES.NVarChar, blobData.blobFileName, { length: 255 });
  storedProcedure.addParameter('BLOB_Orig_File_Name', TYPES.NVarChar, file.originalname, { length: 255 });
  storedProcedure.addParameter('BLOB_Content_Type', TYPES.NVarChar, file.mimetype, { length: 50 });
  storedProcedure.addParameter('BLOB_File_Length', TYPES.Int, file.size);
  storedProcedure.addParameter('Parent_TableCode', TYPES.NVarChar, parentRecordData.tableCode, {length: 50});
  storedProcedure.addParameter('Parent_ExternalSystem_ID', TYPES.BigInt, parentRecordData.externalSystemId);

  storedProcedure.addOutputParameter('OUT_WAT_File_ID', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar);

  let sqlResult;
  sqlResult = await storedProcedure.execute();
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return sqlResult.output.OUT_WAT_File_ID;
}
