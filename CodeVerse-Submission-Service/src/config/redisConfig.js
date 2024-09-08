const Redis = require('ioredis');
const serverConfig = require('./serverConfig');

const redisConfig = {
  port: serverConfig.REDIS_PORT,
  host: serverConfig.REDIS_HOST,
  maxRetriesPerRequest: null
};

module.exports = new Redis(redisConfig);
