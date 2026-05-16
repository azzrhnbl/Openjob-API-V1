const routes = require("./routes");

const CompaniesHandler = require("./handler");

module.exports = (service, validator) => {
  const handler = new CompaniesHandler(service, validator);

  return routes(handler);
};
