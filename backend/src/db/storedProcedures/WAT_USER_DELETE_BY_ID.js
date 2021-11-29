import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_USER_DELETE_BY_ID(portalOwnersId, userId) {
    const storedProcedure = new StoredProcedureCaller('WAT_USER_DELETE_BY_ID');
    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
    storedProcedure.addParameter('WAT_Users_ID', TYPES.Int, userId);
  
    await storedProcedure.execute();
}
