const SubmissionRepository = require('../repostitory/submissionRepository');
const SubmissionProducer = require('../producers/submissionProducer');
const { fetchProblemDetails } = require('../api/problemAdminApi');


class SubmissionService{
    constructor(){
        this.submissionRepository = new SubmissionRepository();
    }

    async addSubmission(submissionData){
        const problemData = await fetchProblemDetails(submissionData.problemId);

        if(!problemData) {
            throw {messgae:'Failed to create a submission in the repository'};
        }


        const languageCodeStub = problemData.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionData.language.toLowerCase());

        console.log(languageCodeStub);

        submissionData.code = languageCodeStub.startSnippet + "\n\n" + submissionData.code + "\n\n" + languageCodeStub.endSnippet;
        
        const submittedData = await this.submissionRepository.createSubmission(submissionData);
        if(!submittedData) {
            // TODO: Add error handling here
            throw {messgae: "Not able to create submission"};
        }


        const response = await SubmissionProducer({
            [submittedData._id]: {
                code: submittedData.code,
                language: submittedData.language,
                inputCases: problemData.data.testCases[0].input,
                outputCases: problemData.data.testCases[0].output,
                userId: submissionData.userId,
                submissionId: submittedData._id
            }
        });
        return {queueResponse: response, submissionData};
    }
}

module.exports = SubmissionService;