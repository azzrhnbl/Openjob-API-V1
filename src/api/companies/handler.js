class CompaniesHandler {
  constructor(service, validator) {
    this._service = service;

    this._validator = validator;

    this.postCompanyHandler = this.postCompanyHandler.bind(this);

    this.getCompaniesHandler = this.getCompaniesHandler.bind(this);

    this.getCompanyByIdHandler = this.getCompanyByIdHandler.bind(this);

    this.putCompanyByIdHandler = this.putCompanyByIdHandler.bind(this);

    this.deleteCompanyByIdHandler = this.deleteCompanyByIdHandler.bind(this);
  }

  async postCompanyHandler(req, res, next) {
    try {
      this._validator.validateCompanyPayload(req.body);

      const companyId = await this._service.addCompany(req.body);

      return res.status(201).json({
        status: "success",
        data: {
          id: companyId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompaniesHandler(req, res, next) {
    try {
      const companies = await this._service.getCompanies();

      return res.json({
        status: "success",
        data: {
          companies,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyByIdHandler(req, res, next) {
    try {
      const company = await this._service.getCompanyById(req.params.id);

      return res.json({
        status: "success",
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  async putCompanyByIdHandler(req, res, next) {
    try {
      this._validator.validateCompanyPayload(req.body);

      await this._service.editCompanyById(req.params.id, req.body);

      return res.json({
        status: "success",
        message: "Company updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCompanyByIdHandler(req, res, next) {
    try {
      await this._service.deleteCompanyById(req.params.id);

      return res.json({
        status: "success",
        message: "Company deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CompaniesHandler;
