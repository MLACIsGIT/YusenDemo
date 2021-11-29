import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_USER_REGISTER(user) {
  const storedProcedure = new StoredProcedureCaller('WAT_USER_REGISTER');

  storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, user.portalOwnersId);
  storedProcedure.addParameter('WAT_Portal_Owners_Partner_ID', TYPES.NVarChar, user.localSystemId, {length: 50});
  storedProcedure.addParameter('UserLevels_Code', TYPES.NVarChar, user.userLevel, {length: 20});
  storedProcedure.addParameter('Name', TYPES.NVarChar, user.name, {length: 100});
  storedProcedure.addParameter('Lang', TYPES.NVarChar, user.language, {length: 3});
  storedProcedure.addParameter('Email', TYPES.NVarChar, user.email, {length: 128});

  storedProcedure.addOutputParameter('OUT_DATA', TYPES.NVarChar, '', {length: 'max'});
  storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
  storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});

  let sqlResult;

  sqlResult = await storedProcedure.execute();

  if (sqlResult.output.OUT_HTTP_Code !== 200) {
      const error = new Error( sqlResult.output.OUT_HTTP_Message );
      error.status = sqlResult.output.OUT_HTTP_Code;

      throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
