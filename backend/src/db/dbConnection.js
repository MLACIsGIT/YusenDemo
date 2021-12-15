import { Connection } from 'tedious'
import logger from '../logger';

const sqlConfig = {
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB_DATABASE,
    encrypt: (process.env.DB_ENCRYPT === 'true'),
    trustServerCertificate: true,
    requestTimeout: (process.env.DB_TIMEOUT) ? parseInt(process.env.DB_TIMEOUT) : 120000,
    cancelTimeout: 120000,
    rowCollectionOnDone: true,
    port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 1433,
  },
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  },
}

export const dbConnection = new Connection(sqlConfig)

export async function resetDbConnection(dbConnection) {
  if (dbConnection?.state?.name !== 'Final') {
    return;
  }

  const promise = new Promise((res, rej) => {
    dbConnection.reset((err) => {
      if (err) {
        rej();
      }
      res();
    })
  })

  await promise()
    .then(() => {
      res();
    })
    .catch(() => {
      throw new Error('Connection failed');
    })
}

export async function opendbConnection() {
  if (dbConnection?.state?.name === 'LoggedIn') {
    return;
  }

  if (dbConnection?.state?.name === 'Final') {
    await resetDbConnection(dbConnection);
    return;
  }

  const promise = new Promise((res, rej) => {
    dbConnection.connect(
      (err) => {
        if (err) {
          logger.error(err);
          rej();
        }
        logger.info('Database connected successfully');
        res();
      })
  });

  await promise
    .then(() => {
      return;
    })
    .catch((err) => {
      const error = new Error('Database connection failed');
      error.status = 500;
      throw error;
    })

  return;
}

opendbConnection(dbConnection)
