const routes = require("./routes");

const ProfileHandler = require("./handler");

module.exports = (service) => {
  const handler = new ProfileHandler(service);

  return routes(handler);
};
