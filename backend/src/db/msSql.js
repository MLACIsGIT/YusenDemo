import logger from '../logger';
import mssql from 'mssql';

export async function connectDb() {
    await mssql.connect(process.env.SQL_CONNECT)
    logger.info('Database connected');
}

export async function disconnect() {
    await mssql.close();
    logger.info('Database disconnected');
}
