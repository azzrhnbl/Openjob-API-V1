const routes = require("./routes");
const JobsHandler = require("./handler");

const JobsValidator = require("../../commons/validator/jobs");
const authMiddleware = require("../../middleware/auth");

module.exports = (service) => {
  const handler = new JobsHandler(service, JobsValidator);

  return routes(handler, authMiddleware);
};
