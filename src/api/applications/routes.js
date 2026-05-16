const express = require("express");

const auth = require("../../middleware/auth");

const router = express.Router();

const routes = (handler) => {
  router.post("/applications", auth, handler.postApplicationHandler);

  router.get("/applications", auth, handler.getApplicationsHandler);

  router.get("/applications/:id", auth, handler.getApplicationByIdHandler);

  router.get(
    "/applications/user/:userId",
    auth,
    handler.getApplicationsByUserHandler,
  );

  router.get(
    "/applications/job/:jobId",
    auth,
    handler.getApplicationsByJobHandler,
  );

  router.put("/applications/:id", auth, handler.putApplicationByIdHandler);

  router.delete(
    "/applications/:id",
    auth,
    handler.deleteApplicationByIdHandler,
  );

  return router;
};

module.exports = routes;
