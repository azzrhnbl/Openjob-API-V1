class ApplicationsHandler {
  constructor(service, validator) {
    this._service = service;

    this._validator = validator;

    this.postApplicationHandler = this.postApplicationHandler.bind(this);

    this.getApplicationsHandler = this.getApplicationsHandler.bind(this);

    this.getApplicationByIdHandler = this.getApplicationByIdHandler.bind(this);

    this.getApplicationsByUserHandler =
      this.getApplicationsByUserHandler.bind(this);

    this.getApplicationsByJobHandler =
      this.getApplicationsByJobHandler.bind(this);

    this.putApplicationByIdHandler = this.putApplicationByIdHandler.bind(this);

    this.deleteApplicationByIdHandler =
      this.deleteApplicationByIdHandler.bind(this);
  }

  async postApplicationHandler(req, res, next) {
    try {
      this._validator.validatePostApplicationPayload(req.body);

      const applicationId = await this._service.addApplication({
        user_id: req.auth.id,
        ...req.body,
      });

      return res.status(201).json({
        status: "success",
        data: {
          id: applicationId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsHandler(req, res, next) {
    try {
      const applications = await this._service.getApplications();

      return res.json({
        status: "success",
        data: {
          applications,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationByIdHandler(req, res, next) {
    try {
      const application = await this._service.getApplicationById(req.params.id);

      return res.json({
        status: "success",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsByUserHandler(req, res, next) {
    try {
      const applications = await this._service.getApplicationsByUser(
        req.params.userId,
      );

      return res.json({
        status: "success",
        data: {
          applications,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsByJobHandler(req, res, next) {
    try {
      const applications = await this._service.getApplicationsByJob(
        req.params.jobId,
      );

      return res.json({
        status: "success",
        data: {
          applications,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putApplicationByIdHandler(req, res, next) {
    try {
      this._validator.validatePutApplicationPayload(req.body);

      await this._service.editApplicationById(req.params.id, req.body.status);

      return res.json({
        status: "success",
        message: "Application updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteApplicationByIdHandler(req, res, next) {
    try {
      await this._service.deleteApplicationById(req.params.id);

      return res.json({
        status: "success",
        message: "Application deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ApplicationsHandler;
