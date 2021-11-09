import mssql from 'mssql';

export async function WAT_USER_DELETE_BY_ID(portalOwnersId, userId) {
    const sqlRequest = new mssql.Request();
    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, portalOwnersId);
    sqlRequest.input('WAT_Users_ID', mssql.Int, userId);
  
    await sqlRequest.execute('WAT_USER_DELETE_BY_ID');
}
