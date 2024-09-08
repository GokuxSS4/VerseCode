const markdownSanitizer = require('../utils/markDownSanitizer');

class ProblemService {
    constructor(problemRepostiory){
        this.problemRepostiory = problemRepostiory; 
    }

    async addProblem(problemData){
        problemData.description = markdownSanitizer(problemData.description); 
        const problem = await this.problemRepostiory.addProblem(problemData);
        return problem
    }

    async getAllProblems(){
        const problems = await this.problemRepostiory.getAllProblems();
        return problems
    }

    async getProblem(problemId){
        const problem = await this.problemRepostiory.getProblem(problemId);
        return problem;
    }

    async deleteProblem(problemId){
        const deletedproblem = await this.problemRepostiory.deleteProblem(problemId);
        return deletedproblem;
    }
};

module.exports = ProblemService;