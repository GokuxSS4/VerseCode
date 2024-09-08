// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const app = require('./app');
const connectDB = require('./config/dbConfig');

const {PORT} = require("./config/serverConfig");
const EvalutorWorker = require("./workers/evalutorWorker");


fastify.register(app);

// Run the server!
fastify.listen({port:PORT},async (err) => {
  await connectDB();
  console.log(`Server running on port:${PORT}`);
  EvalutorWorker("EvalutionQueue");
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})