import { deliveries, invoices, news, stocks, users, userLevels } from './data';
import {
  DeliveryService,
  InvoiceService,
  NewsService,
  UserLevelService,
  UserService,
  StockService,
} from '../src/services';
import mongoose from 'mongoose';

export async function setBaseData() {
  let collections = await mongoose.connection.db.listCollections().toArray();
  collections = collections ?? [];

  //UserLevels
  if (!collections.some(collection => collection.name === 'userlevels')) {
    for (let i = 0; i < userLevels.length; i++) {
      const currentLevel = {
        level: userLevels[i].level,
        params: JSON.stringify(userLevels[i].params),
      };
      await UserLevelService.add(currentLevel);
    }
  }

  //users
  if (!collections.some(collection => collection.name === 'users')) {
    for (let i = 0; i < users.length; i++) {
      await UserService.import(users[i]);
    }
  }

  //invoices
  if (!collections.some(collection => collection.name === 'invoices')) {
    for (let i = 0; i < invoices.length; i++) {
      await InvoiceService.upload(invoices[i]);
    }
  }

  //News
  if (!collections.some(collection => collection.name === 'news')) {
    for (let i = 0; i < news.length; i++) {
      await NewsService.add(news[i]);
    }
  }

  //Stocks
  if (!collections.some(collection => collection.name === 'stocks')) {
    for (let i = 0; i < stocks.length; i++) {
      await StockService.upload(stocks[i]);
    }
  }

  //Deliveries
  if (!collections.some(collection => collection.name === 'deliveries')) {
    for (let i = 0; i < deliveries.length; i++) {
      await DeliveryService.upload(deliveries[i]);
    }
  }
}
