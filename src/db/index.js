import { Pool } from 'pg';
import accessEnv from '../util/accessEnv';

// Creates a pool of Client, default number of max clients = 10
const pool = new Pool({
  user: accessEnv('DB_USER'),
  password: accessEnv('DB_PASSWORD'),
  host: accessEnv('DB_HOST'),
  port: accessEnv('DB_PORT'),
  database: accessEnv('DB_NAME'),
});

/**
 * DB Query - Returns the response of a DB query
 * @param {object} text - query to be evaluated
 * @param {object} params - parameters to be used in the qury
 * @returns {object} result object
 */
const query = async (text, params) => {
  try {
    const start = Date.now();
    // Runs query on the first available idle client
    const result = await pool.query(text, params);

    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: result.rowCount });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Returns a client from the pool
 * @returns {object} client object
 */
const getClient = async () => {
  try {
    // Acquires a client from the pool.
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { query, getClient };
