const express = require("express");

const router = express.Router();

const routes = (handler) => {
  router.post("/authentications", handler.postAuthenticationHandler);

  router.put("/authentications", handler.putAuthenticationHandler);

  router.delete("/authentications", handler.deleteAuthenticationHandler);

  return router;
};

module.exports = routes;
