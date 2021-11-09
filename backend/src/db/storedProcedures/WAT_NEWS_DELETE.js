import mssql from 'mssql';

export async function WAT_NEWS_DELETE(portalOwnersId, newsId) {
    const sqlRequest = new mssql.Request();
    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
    sqlRequest.input('WAT_NEWS_ID', mssql.Int, newsId);
  
    await sqlRequest.execute('WAT_NEWS_DELETE');
}
