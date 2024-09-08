const fastifyPlugin = require('fastify-plugin');

async function app(fastify,options){
    await fastify.register(require('@fastify/cors'));
    await fastify.register(require('./routes/apiRoutes'));
    await fastify.register(require('./services/servicePlugin'));
    await fastify.register(require('./repostitory/repostioryPlugin'));

}

module.exports = fastifyPlugin(app);
