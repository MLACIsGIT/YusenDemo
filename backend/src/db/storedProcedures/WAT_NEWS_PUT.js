import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_NEWS_PUT(portalOwnersId, news) {
    const storedProcedure = new StoredProcedureCaller('WAT_NEWS_PUT');

    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, portalOwnersId);
console.log('+++ news', news)
    storedProcedure.addParameter('WAT_NEWS_ID', TYPES.Int, news._id);
    storedProcedure.addParameter('WAT_NEWS_Date', TYPES.DateTime, new Date(news.date));
    storedProcedure.addParameter('WAT_NEWS_ExpireDate', TYPES.DateTime, new Date(news.expireDate));
    storedProcedure.addParameter('WAT_NEWS_Language', TYPES.NVarChar, (news.language) ? news.language : 'en', {length: 3});
    storedProcedure.addParameter('WAT_NEWS_Title', TYPES.NVarChar, news.title, {length: 'max'});
    storedProcedure.addParameter('WAT_NEWS_ShortDescription', TYPES.NVarChar, news.shortDescription, {length: 'max'});
    storedProcedure.addParameter('WAT_NEWS_LinkToArticle', TYPES.NVarChar, news.linkToArticle, {length: 'max'});
    
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
