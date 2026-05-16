const Joi = require("joi");

const PostJobPayloadSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().required(),
  experience_level: Joi.string().required(),
  location_type: Joi.string().required(),
  location_city: Joi.string().allow(null, ""),
  salary_min: Joi.number().allow(null),
  salary_max: Joi.number().allow(null),
  is_salary_visible: Joi.boolean().default(false),
  status: Joi.string().required(),
});

const PutJobPayloadSchema = Joi.object({
  company_id: Joi.string(),
  category_id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  job_type: Joi.string(),
  experience_level: Joi.string(),
  location_type: Joi.string(),
  location_city: Joi.string().allow(null, ""),
  salary_min: Joi.number().allow(null),
  salary_max: Joi.number().allow(null),
  is_salary_visible: Joi.boolean(),
  status: Joi.string(),
});

module.exports = {
  PostJobPayloadSchema,
  PutJobPayloadSchema,
};
