const InvariantError = require("../exceptions/InvariantError");

const validator = (schema, payload) => {
  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};

module.exports = validator;
