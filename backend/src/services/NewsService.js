import News from '../repository/News';

export class NewsService {
  static async add(news) {
    return await News.add(news);
  }

  static async getAll(language, userLevel) {
    const currentDate = new Date();
    let filters = {
      $and: [{ language }, { expireDate: { $gte: currentDate } }],
    };
    const orderBy = { date: 'desc' };

    if (userLevel === 'OWNER_SA') {
      filters = { language };
    }

    const docs = await News.getDocs(filters, orderBy);
    return docs;
  }

  static async get(id) {
    let doc = await News.getById(id);
    return doc;
  }

  static async put(id, news) {
    if (id) {
      return await News.put(id, news);
    }
    return await News.add(news);
  }

  static async delete(id) {
    return await News.delete(id);
  }
}
