const InvariantError = require("../../exceptions/InvariantError");

const { PostJobPayloadSchema, PutJobPayloadSchema } = require("./schema");

const JobsValidator = {
  validatePostJobPayload: (payload) => {
    const validationResult = PostJobPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutJobPayload: (payload) => {
    const validationResult = PutJobPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = JobsValidator;
