const express  = require('express');
const {v1Router} = require('./v1/index')

const appRouter = express.Router();

appRouter.use('/v1',v1Router);

module.exports = {
    appRouter
}