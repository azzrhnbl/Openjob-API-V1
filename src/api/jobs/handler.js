class JobsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postJobHandler = this.postJobHandler.bind(this);

    this.getJobsHandler = this.getJobsHandler.bind(this);

    this.getJobsByCompanyIdHandler = this.getJobsByCompanyIdHandler.bind(this);

    this.getJobsByCategoryIdHandler =
      this.getJobsByCategoryIdHandler.bind(this);

    this.getJobByIdHandler = this.getJobByIdHandler.bind(this);

    this.putJobByIdHandler = this.putJobByIdHandler.bind(this);

    this.deleteJobByIdHandler = this.deleteJobByIdHandler.bind(this);
  }

  async postJobHandler(req, res, next) {
    try {
      this._validator.validatePostJobPayload(req.body);

      const jobId = await this._service.addJob(req.body);

      return res.status(201).json({
        status: "success",
        data: {
          id: jobId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsHandler(req, res, next) {
    try {
      const title = req.query.title || "";

      const companyName = req.query["company-name"] || "";

      const jobs = await this._service.getJobs(title, companyName);

      return res.json({
        status: "success",
        data: {
          jobs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsByCompanyIdHandler(req, res, next) {
    try {
      const jobs = await this._service.getJobsByCompanyId(req.params.id);

      return res.json({
        status: "success",
        data: {
          jobs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsByCategoryIdHandler(req, res, next) {
    try {
      const jobs = await this._service.getJobsByCategoryId(req.params.id);

      return res.json({
        status: "success",
        data: {
          jobs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobByIdHandler(req, res, next) {
    try {
      const job = await this._service.getJobById(req.params.id);

      return res.json({
        status: "success",
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async putJobByIdHandler(req, res, next) {
    try {
      this._validator.validatePutJobPayload(req.body);

      await this._service.editJobById(req.params.id, req.body);

      return res.json({
        status: "success",
        message: "Job updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobByIdHandler(req, res, next) {
    try {
      await this._service.deleteJobById(req.params.id);

      return res.json({
        status: "success",
        message: "Job deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JobsHandler;
