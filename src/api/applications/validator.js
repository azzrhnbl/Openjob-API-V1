const validator = require("../../commons/validator");

const {
  PostApplicationPayloadSchema,
  PutApplicationPayloadSchema,
} = require("./schema");

const ApplicationsValidator = {
  validatePostApplicationPayload: (payload) => {
    validator(PostApplicationPayloadSchema, payload);
  },

  validatePutApplicationPayload: (payload) => {
    validator(PutApplicationPayloadSchema, payload);
  },
};

module.exports = ApplicationsValidator;
