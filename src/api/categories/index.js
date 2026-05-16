const routes = require("./routes");

const CategoriesHandler = require("./handler");

module.exports = (service, validator) => {
  const handler = new CategoriesHandler(service, validator);

  return routes(handler);
};
