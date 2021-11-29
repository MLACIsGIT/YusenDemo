import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_NEWS_GET_ALL(portalOwnersId, language) {
    const storedProcedure = new StoredProcedureCaller('WAT_NEWS_GET_ALL');

    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
    storedProcedure.addParameter('Language', TYPES.NVarChar, (language) ? language : 'en', {length: 3});

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
