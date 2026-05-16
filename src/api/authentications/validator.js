const validator = require("../../commons/validator");

const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require("./schema");

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    validator(PostAuthenticationPayloadSchema, payload);
  },

  validatePutAuthenticationPayload: (payload) => {
    validator(PutAuthenticationPayloadSchema, payload);
  },

  validateDeleteAuthenticationPayload: (payload) => {
    validator(DeleteAuthenticationPayloadSchema, payload);
  },
};

module.exports = AuthenticationsValidator;
