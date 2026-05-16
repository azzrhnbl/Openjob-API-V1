const Joi = require("joi");

const PostApplicationPayloadSchema = Joi.object({
  job_id: Joi.string().required(),
  cover_letter: Joi.string().allow("", null),
});

module.exports = {
  PostApplicationPayloadSchema,
};
