import mssql from 'mssql';

export async function WAT_USER_UPDATE(user) {
    const sqlRequest = new mssql.Request();

    sqlRequest.input('WAT_Portal_Owners_ID', mssql.Int, user.portalOwnersId);
    sqlRequest.input('WAT_Users_ID', mssql.Int, user._id);

    sqlRequest.input('GDPR_Accepted', mssql.Bit, user.gdprAccepted);
    sqlRequest.input('TermsOfServiceAccepted', mssql.Bit, user.termsOfServiceAccepted);
    sqlRequest.input('emailAnnouncementsAccepted', mssql.Bit, user.emailAnnouncementsAccepted);
    sqlRequest.input('newsletterAccepted', mssql.Bit, user.newsletterAccepted);
    sqlRequest.input('Name', mssql.NVarChar(100), user.name);
    sqlRequest.input('Email', mssql.NVarChar(128), user.email);
    sqlRequest.input('Password_hash', mssql.NVarChar(1024), user.passHash);
    sqlRequest.input('Status', mssql.NVarChar(50), user.status);
    sqlRequest.input('UserLevels_Code', mssql.NVarChar(20), user.userLevel);
    sqlRequest.input('Lang', mssql.NVarChar(3), (user.language) ? user.language : 'en');
    
    sqlRequest.output('OUT_DATA', mssql.NVarChar('max'));

    sqlRequest.output('OUT_HTTP_Code', mssql.Int);
    sqlRequest.output('OUT_HTTP_Message', mssql.NVarChar('max'));
  
    let sqlResult;
    sqlResult = await sqlRequest.execute('WAT_USER_UPDATE');
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return JSON.parse(sqlResult.output.OUT_DATA);
}
