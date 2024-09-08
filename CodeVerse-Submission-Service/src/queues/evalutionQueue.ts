const { Queue } = require("bullmq");
const redisConfig = require("../config/redisConfig");

module.exports = new Queue("EvalutionQueue",{connection:redisConfig});