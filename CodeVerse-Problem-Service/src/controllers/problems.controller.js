const {StatusCodes} = require('http-status-codes');

const {ProblemService} = require('../services/index');
const {ProblemRepository} = require('../repositories/index');

const problemService = new ProblemService(new ProblemRepository());

function pingProblem(req,res){
    return res.status(StatusCodes.OK).json({
        message:"Ping Controller is alive"
    })
}

async function addProblem(req,res,next){
    try {
        const problemData = req.body;
        const problem = await problemService.addProblem(problemData);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully created a new problem',
            error: {},
            data: problem
        })
    } catch (error) {
     next(error);   
    }
};

async function getProblem(req,res,next){
    try {
        const problem = await problemService.getProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetch problem',
            error: {},
            data: problem
        }); 
       } catch (error) {
            next(error)
       }
};

async function getAllProblems(req,res,next){
   try {
    const problems = await problemService.getAllProblems();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Successfully fetches all problems',
        error: {},
        data: problems
    }); 
   } catch (error) {
        next(error)
   }
};

function updateProblem(req,res){
   return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        message: "Not Implemented !"    
    })
};

async function deleteProblem(req,res,next){
    try {
        const deletedproblem = await problemService.deleteProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted problem',
            error: {},
            data: deletedproblem
        }); 
       } catch (error) {
            next(error)
       }
};

module.exports={
    pingProblem,
    addProblem,
    getProblem,
    getAllProblems,
    updateProblem,
    deleteProblem
}