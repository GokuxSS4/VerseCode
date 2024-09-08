const createSubmissionController = require('../../controller/submissionController');

async function submissionRoutes(fastify,options){
  fastify.post('/submission', createSubmissionController)
}

module.exports = submissionRoutes;