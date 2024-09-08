async function createSubmissionController(req,res){
    const message = await this.submissionService.addSubmission(req.body);
    return res.status(201).send({
        error: {},
        data: message,
        success: true,
        message: 'Created submission successfully'
    })

}

module.exports = createSubmissionController;