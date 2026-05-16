const validator = require("../../commons/validator");

const { CompanyPayloadSchema } = require("./schema");

const CompaniesValidator = {
  validateCompanyPayload: (payload) => {
    validator(CompanyPayloadSchema, payload);
  },
};

module.exports = CompaniesValidator;
