import mssql from 'mssql';

export async function WAT_NEWS_PUT(portalOwnersId, news) {
    const sqlRequest = new mssql.Request();

    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);

    sqlRequest.input('WAT_NEWS_ID', mssql.Int, news._id);
    sqlRequest.input('WAT_NEWS_Date', mssql.DateTime, new Date(news.date));
    sqlRequest.input('WAT_NEWS_ExpireDate', mssql.DateTime, new Date(news.expireDate));

    sqlRequest.input('WAT_NEWS_Language', mssql.NVarChar(3), (news.language) ? news.language : 'en');

    sqlRequest.input('WAT_NEWS_Title', mssql.NVarChar('max'), news.title);
    sqlRequest.input('WAT_NEWS_ShortDescription', mssql.NVarChar('max'), news.shortDescription);
    sqlRequest.input('WAT_NEWS_LinkToArticle', mssql.NVarChar('max'), news.linkToArticle);
    

    sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));

    sqlRequest.output('OUT_HTTP_Code', mssql.Int);
    sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));
  
    let sqlResult;
    sqlResult = await sqlRequest.execute('WAT_NEWS_PUT');
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return JSON.parse(sqlResult.output.OUT_DATA);
}
