const express = require("express");

const auth = require("../../middleware/auth");

const router = express.Router();

const routes = (handler) => {
  router.get("/profile", auth, handler.getProfileHandler);

  router.get(
    "/profile/applications",
    auth,
    handler.getProfileApplicationsHandler,
  );

  router.get("/profile/bookmarks", auth, handler.getProfileBookmarksHandler);

  return router;
};

module.exports = routes;
