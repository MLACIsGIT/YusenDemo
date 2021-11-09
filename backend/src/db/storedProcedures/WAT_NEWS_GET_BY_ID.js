import mssql from 'mssql';

export async function WAT_NEWS_GET_BY_ID(portalOwnersId, newsId) {
    const sqlRequest = new mssql.Request();

    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
    sqlRequest.input('WAT_NEWS_ID', mssql.Int, newsId);

    sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));
    sqlRequest.output('OUT_HTTP_Code', mssql.Int);
    sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));
  
    let sqlResult;
    sqlResult = await sqlRequest.execute('WAT_NEWS_GET_BY_ID');
  
    return JSON.parse(sqlResult.output.OUT_DATA);  
}
