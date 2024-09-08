async function v1Routes(fastify,options){
    fastify.register(require('./submissionRoutes'),{
        prefix: '/v1'
    })
}

module.exports = v1Routes;