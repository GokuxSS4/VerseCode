const submissionModel = require('../models/submissionModel');

class SubmissionRepository{
  constructor(){
    this.submissionModel = submissionModel
  }

  async createSubmission(submissionData){
    const res = await this.submissionModel.create(submissionData);
    return res;   
  }
}

module.exports = SubmissionRepository;