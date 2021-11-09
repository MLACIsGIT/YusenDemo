import News from '../repository/News';

export class NewsService {
  static async add(news) {
    return await News.add(news);
  }

  static async getAll(portalOwnersId, language) {
    const docs = await News.getAll(portalOwnersId, language);
    return docs;
  }

  static async getList(portalOwnersId, language) {
    const docs = await News.getList(portalOwnersId, language);
    return docs;
  }

  static async get(portalOwnersId, newsId) {
    let doc = await News.getById(portalOwnersId, newsId);
    return doc;
  }

  static async put(portalOwnersId, news) {
    return await News.put(portalOwnersId, news);
  }

  static async delete(portalOwnersId, id) {
    return await News.delete(portalOwnersId, id);
  }
}
