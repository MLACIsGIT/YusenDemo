import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_USER_PARAMS_GET(portalOwnersId, userId) {
  const storedProcedure = new StoredProcedureCaller('WAT_USER_PARAMS_GET');

  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
  storedProcedure.addParameter('UsersID', TYPES.Int, userId);

  storedProcedure.addOutputParameter('OUT_User_Params', TYPES.NVarChar, '', {length: 'max'});
  storedProcedure.addOutputParameter('OUT_UserLevel_Params', TYPES.NVarChar, '', {length: 'max'});
  storedProcedure.addOutputParameter('OUT_Portal_Owners_Params', TYPES.NVarChar, '', {length: 'max'});

  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});

  let sqlResult;
  sqlResult = await storedProcedure.execute();

  return {
    userParams: JSON.parse(sqlResult.output.OUT_User_Params),
    userLevelParams: JSON.parse(sqlResult.output.OUT_UserLevel_Params),
    portalOwnerParams: JSON.parse(sqlResult.output.OUT_Portal_Owners_Params),
  };
}
