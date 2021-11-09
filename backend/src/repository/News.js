import {
  WAT_NEWS_GET_ALL,
  WAT_NEWS_GET_LIST,
  WAT_NEWS_PUT,
  WAT_NEWS_DELETE,
  WAT_NEWS_GET_BY_ID
} from '../db/storedProcedures';

export default class News {
  static async getAll(portalOwnersId, language) {
    let result = await WAT_NEWS_GET_ALL(portalOwnersId, language);
    return result;
  }

  static async getList(portalOwnersId, language) {
    let result = await WAT_NEWS_GET_LIST(portalOwnersId, language);
    return result;
  }

  static async getById(portalOwnersId, newsId) {
    let result = await WAT_NEWS_GET_BY_ID(portalOwnersId, newsId);
    return result;
  }

  static async put(portalOwnersId, news) {
    let result = await WAT_NEWS_PUT(portalOwnersId, news);
    return result;
  }

  static async delete(portalOwnersId, id) {
    await WAT_NEWS_DELETE(portalOwnersId, id);
  }
}
