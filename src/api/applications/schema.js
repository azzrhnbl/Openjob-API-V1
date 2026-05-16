const Joi = require("joi");

const PostApplicationPayloadSchema = Joi.object({
  user_id: Joi.string().optional(),
  job_id: Joi.string().required(),
  cover_letter: Joi.string().allow("", null),
  status: Joi.string().optional(),
});

const PutApplicationPayloadSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "reviewed", "accepted", "rejected")
    .required(),
});

module.exports = {
  PostApplicationPayloadSchema,
  PutApplicationPayloadSchema,
};
