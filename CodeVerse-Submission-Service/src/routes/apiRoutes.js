async function apiRoutes(fastify,options){
    fastify.register(require('./v1/v1Routes'),{
        prefix: '/api'
    })
}

module.exports = apiRoutes;