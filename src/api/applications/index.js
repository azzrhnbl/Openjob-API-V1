const routes = require("./routes");

const ApplicationsHandler = require("./handler");

module.exports = (service, validator) => {
  const handler = new ApplicationsHandler(service, validator);

  return routes(handler);
};
