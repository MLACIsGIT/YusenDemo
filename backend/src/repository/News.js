import { NewsModel } from '../models/db/NewsModel';

export default class News {
  static async add(news) {
    const newNews = new NewsModel({
      date: news.date,
      expireDate: news.expireDate,
      language: news.language,
      title: news.title,
      shortDescription: news.shortDescription,
      linkToArticle: news.linkToArticle,
    });

    try {
      const result = await newNews.save();
      return result;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async getById(id) {
    let result = await NewsModel.findOne({ _id: id });
    if (!result) {
      throw new Error('not found');
    }
    return result;
  }

  static async getDocs(filters, orderBy) {
    try {
      const docs = await NewsModel.find(filters).sort(orderBy);
      return docs;
    } catch (e) {
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  static async put(id, news) {
    let doc = await NewsModel.findOneAndUpdate({ _id: id }, news);
    if (!doc) {
      throw new Error('not found');
    }

    return doc;
  }

  static async delete(id) {
    await NewsModel.deleteOne( {_id: id });
  }
}
