const routes = require("./routes");

const DocumentsHandler = require("./handler");

module.exports = (service) => {
  const handler = new DocumentsHandler(service);

  return routes(handler);
};
