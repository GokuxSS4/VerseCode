const express = require('express');
const {problemController} = require('../../controllers/index');

const problemRouter = express.Router();

problemRouter.get('/ping', problemController.pingProblem);

problemRouter.get('/:id', problemController.getProblem);

problemRouter.get('/', problemController.getAllProblems);

problemRouter.post('/', problemController.addProblem);

problemRouter.delete('/:id', problemController.deleteProblem);

problemRouter.put('/:id', problemController.updateProblem);


module.exports = problemRouter;
