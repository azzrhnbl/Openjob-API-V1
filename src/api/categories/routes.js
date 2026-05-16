const express = require("express");

const authMiddleware = require("../../middleware/auth");

const routes = (handler) => {
  const router = express.Router();

  router.post("/categories", authMiddleware, handler.postCategoryHandler);

  router.get("/categories", handler.getCategoriesHandler);

  router.get("/categories/:id", handler.getCategoryByIdHandler);

  router.put("/categories/:id", authMiddleware, handler.putCategoryByIdHandler);

  router.delete(
    "/categories/:id",
    authMiddleware,
    handler.deleteCategoryByIdHandler,
  );

  return router;
};

module.exports = routes;
