import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_NEWS_GET_BY_ID(portalOwnersId, newsId) {
    const storedProcedure = new StoredProcedureCaller('WAT_NEWS_GET_BY_ID');

    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
    storedProcedure.addParameter('WAT_NEWS_ID', TYPES.Int, newsId);

    storedProcedure.addOutputParameter('OUT_DATA', TYPES.NVarChar, '', {length: 'max'});
    storedProcedure.addOutputParameter('OUT_HTTP_Code', TYPES.Int);
    storedProcedure.addOutputParameter('OUT_HTTP_Message', TYPES.NVarChar, '', {length: 'max'});
  
    let sqlResult;
    sqlResult = await storedProcedure.execute();
  
    return JSON.parse(sqlResult.output.OUT_DATA);  
}
