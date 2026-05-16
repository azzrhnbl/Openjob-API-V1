const express = require("express");

const auth = require("../../middleware/auth");

const router = express.Router();

const routes = (handler) => {
  router.post("/jobs/:jobId/bookmark", auth, handler.postBookmarkHandler);

  router.get("/jobs/:jobId/bookmark/:id", auth, handler.getBookmarkByIdHandler);

  router.delete("/jobs/:jobId/bookmark", auth, handler.deleteBookmarkHandler);

  router.get("/bookmarks", auth, handler.getBookmarksHandler);

  return router;
};

module.exports = routes;
