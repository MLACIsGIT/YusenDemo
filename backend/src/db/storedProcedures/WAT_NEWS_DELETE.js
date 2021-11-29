import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_NEWS_DELETE(portalOwnersId, newsId) {
    const storedProcedure = new StoredProcedureCaller('WAT_NEWS_DELETE');
    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
    storedProcedure.addParameter('WAT_NEWS_ID', TYPES.Int, newsId);
  
    await storedProcedure.execute();
}
