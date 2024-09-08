const {Problem} = require('../models/index');
const logger = require('../config/logger.config');
const NotFound = require('../errors/notFound.error');

class ProblemRepository{
    async addProblem(problemData){
        try {
            await Problem.create({
                title: problemData.title,
                description:problemData.description,
                testCases:problemData.testCases ? problemData.testCases :[],
                codeStubs: problemData.codeStubs
            });
            return problemData
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProblems(){
        try {
            const problems = await Problem.find({});
            return problems;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProblem(problemId){
        try {
            const problem = await Problem.findById(problemId);

            console.log( problem);

            if(!problem) {
                throw new NotFound("Problem", problemId);
            }
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    
    async deleteProblem(problemId){
        try {
            const deletedproblem = await Problem.findByIdAndDelete(problemId);

            if(!deletedproblem) {
                logger.error(`Problem.Repository: Problem with id: ${problemId} not found in the db`);
                throw new NotFound("Problem", problemId);
            }
            return deletedproblem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProblemRepository;