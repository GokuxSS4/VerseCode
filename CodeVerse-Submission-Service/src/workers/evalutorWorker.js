const { Worker } = require("bullmq");
const redisConfig = require("../config/redisConfig");
const axios = require('axios');

module.exports = function EvalutorWorker(queueName) {
    new Worker(
        queueName, 
        async (job) => {
            if(job.name === "EvalutionQueue") {
                const response = await axios.post('http://localhost:3001/sendPayload', {
                  userId: job.data.userId,
                  payload: job.data
              })
                return true;
            }
        },
        {
            connection: redisConfig
        }
    );
}