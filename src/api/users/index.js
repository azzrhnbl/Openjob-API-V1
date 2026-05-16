const express = require("express");

const routes = require("./routes");
const UsersHandler = require("./handler");

module.exports = (service, validator) => {
  const handler = new UsersHandler(service, validator);

  const router = express.Router();

  router.use("/users", routes(handler));

  return router;
};
