const validator = require("../../commons/validator");

const { PostJobPayloadSchema, PutJobPayloadSchema } = require("./schema");

const JobsValidator = {
  validatePostJobPayload: (payload) => {
    validator(PostJobPayloadSchema, payload);
  },

  validatePutJobPayload: (payload) => {
    validator(PutJobPayloadSchema, payload);
  },
};

module.exports = JobsValidator;
