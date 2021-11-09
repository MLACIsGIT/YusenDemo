import logger from './logger';
import app from './app';
import { connectDb } from './db/msSql';

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
