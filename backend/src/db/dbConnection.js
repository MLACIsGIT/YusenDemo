import { Connection } from "tedious"
import logger from '../logger';

const sqlConfig = {
    server: process.env.DB_SERVER,
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        }
    },
    options: {
        database: process.env.DB_DATABASE,
        trustServerCertificate: true,
        requestTimeout: parseInt(process.env.DB_TIMEOUT),
        rowCollectionOnDone: true,
        port: parseInt(process.env.DB_PORT),
        encrypt: (process.env.DB_ENCRYPT === 'true'),
    }
}

export const dbConnection = new Connection(sqlConfig);

dbConnection.connect(
    function (err) {
        if (err) {
            console.log('+++ err', err)
            logger.error(err);
            return;
        }

        logger.info('Database connected');
    })
