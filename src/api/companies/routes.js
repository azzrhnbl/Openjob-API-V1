const express = require("express");

const auth = require("../../middleware/auth");

const router = express.Router();

const routes = (handler) => {
  router.post("/companies", auth, handler.postCompanyHandler);

  router.get("/companies", handler.getCompaniesHandler);

  router.get("/companies/:id", handler.getCompanyByIdHandler);

  router.put("/companies/:id", auth, handler.putCompanyByIdHandler);

  router.delete("/companies/:id", auth, handler.deleteCompanyByIdHandler);

  return router;
};

module.exports = routes;
