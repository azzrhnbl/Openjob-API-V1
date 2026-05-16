const validator = require("../../commons/validator");

const { PostApplicationPayloadSchema } = require("./schema");

const ApplicationsValidator = {
  validatePostApplicationPayload: (payload) => {
    validator(PostApplicationPayloadSchema, payload);
  },
};

module.exports = ApplicationsValidator;
