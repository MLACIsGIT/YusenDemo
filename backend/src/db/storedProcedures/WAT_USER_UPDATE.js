import { TYPES } from 'tedious';
import StoredProcedureCaller from './StoredProcedureCaller'

export async function WAT_USER_UPDATE(user) {
    const storedProcedure = new StoredProcedureCaller('WAT_USER_UPDATE');

    storedProcedure.addParameter('WAT_Portal_Owners_ID', TYPES.Int, user.portalOwnersId);
    storedProcedure.addParameter('WAT_Users_ID', TYPES.Int, user._id);

    storedProcedure.addParameter('GDPR_Accepted', TYPES.Bit, user.gdprAccepted);
    storedProcedure.addParameter('TermsOfServiceAccepted', TYPES.Bit, user.termsOfServiceAccepted);
    storedProcedure.addParameter('emailAnnouncementsAccepted', TYPES.Bit, user.emailAnnouncementsAccepted);
    storedProcedure.addParameter('newsletterAccepted', TYPES.Bit, user.newsletterAccepted);
    storedProcedure.addParameter('Name', TYPES.NVarChar, user.name, {length: 100});
    storedProcedure.addParameter('Email', TYPES.NVarChar, user.email, {length: 128});
    storedProcedure.addParameter('Password_hash', TYPES.NVarChar, user.passHash, {length: 1024});
    storedProcedure.addParameter('Status', TYPES.NVarChar, user.status, {length: 50});
    storedProcedure.addParameter('UserLevels_Code', TYPES.NVarChar, user.userLevel, {length: 20});
    storedProcedure.addParameter('Lang', TYPES.NVarChar, (user.language) ? user.language : 'en', {length: 3});
    
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
