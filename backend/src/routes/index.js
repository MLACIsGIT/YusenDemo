import apiRouter from './api.routes';
import deliveriesRouter from './deliveries.routes';
import dataRouter from './data.routes';
import localsystemRouter from './localsystem.routes';
import newsRouter from './news.routes';
import stocksRouter from './stocks.routes';
import usersRouter from './users.routes';
import fileStreamRouter from './filestream.routes';

export const api = apiRouter;
export const deliveries = deliveriesRouter;
export const data = dataRouter;
export const localsystem = localsystemRouter;
export const news = newsRouter;
export const stocks = stocksRouter;
export const users = usersRouter;
export const filestream = fileStreamRouter;
