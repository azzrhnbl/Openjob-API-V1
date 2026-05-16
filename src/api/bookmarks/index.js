const routes = require("./routes");

const BookmarksHandler = require("./handler");

module.exports = (service) => {
  const handler = new BookmarksHandler(service);

  return routes(handler);
};
