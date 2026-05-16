const express = require("express");

const auth = require("../../middleware/auth");

const upload = require("../../utils/upload");

const router = express.Router();

const routes = (handler) => {
  router.post(
    "/documents",
    auth,
    upload.single("document"),
    handler.postDocumentHandler,
  );

  router.get("/documents", handler.getDocumentsHandler);

  router.get("/documents/:id", handler.getDocumentByIdHandler);

  router.delete("/documents/:id", auth, handler.deleteDocumentByIdHandler);

  return router;
};

module.exports = routes;
