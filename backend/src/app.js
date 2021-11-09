import express from 'express';
import morgan from 'morgan';

import { api, deliveries, data, filestream, localsystem, news, stocks, users } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/data', data);
app.use('/deliveries', deliveries);
app.use('/filestream', filestream);
app.use('/localsystem', localsystem);
app.use('/news', news);
app.use('/stocks', stocks);
app.use('/users', users);

app.use(errorHandler);

export default app;
