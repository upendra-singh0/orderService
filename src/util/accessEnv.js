import dotenv from 'dotenv';

dotenv.config();

const cache = {};

/**
 * Access Environment variable - make the reads faster by caching
 * @param {string} key - key to be found in env variable
 * @param {string|number} key - default value of the specified key
 * @returns {string|number} returns key value
 */

const accessEnv = (key, defaultValue) => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env`);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return cache[key];
};

export default accessEnv;
