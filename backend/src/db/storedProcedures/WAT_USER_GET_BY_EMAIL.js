import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_USER_GET_BY_EMAIL(portalOwnersId, email) {
  const storedProcedure = new StoredProcedureCaller('WAT_USER_GET_BY_EMAIL');

  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
  storedProcedure.addParameter('email', TYPES.NVarChar, email, {length: 128});

  storedProcedure.addOutputParameter('OUT_DATA', TYPES.NVarChar, '', {length: 'max'});
  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});

  let sqlResult;
  sqlResult = await storedProcedure.execute();

  return JSON.parse(sqlResult.output.OUT_DATA);
}
