const validator = require("../../commons/validator");

const { ApplicationPayloadSchema } = require("./schema");

const ApplicationsValidator = {
  validateApplicationPayload: (payload) => {
    validator(ApplicationPayloadSchema, payload);
  },
};

module.exports = ApplicationsValidator;
