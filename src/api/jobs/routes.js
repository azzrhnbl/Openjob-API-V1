const express = require("express");

const routes = (handler, authMiddleware) => {
  const router = express.Router();

  router.post("/jobs", authMiddleware, handler.postJobHandler);

  router.get("/jobs", handler.getJobsHandler);

  router.get("/jobs/company/:id", handler.getJobsByCompanyIdHandler);

  router.get("/jobs/category/:id", handler.getJobsByCategoryIdHandler);

  router.get("/jobs/:id", handler.getJobByIdHandler);

  router.put("/jobs/:id", authMiddleware, handler.putJobByIdHandler);

  router.delete("/jobs/:id", authMiddleware, handler.deleteJobByIdHandler);

  return router;
};

module.exports = routes;
