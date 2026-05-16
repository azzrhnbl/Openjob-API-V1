class DocumentsHandler {
  constructor(service) {
    this._service = service;

    this.postDocumentHandler = this.postDocumentHandler.bind(this);

    this.getDocumentsHandler = this.getDocumentsHandler.bind(this);

    this.getDocumentByIdHandler = this.getDocumentByIdHandler.bind(this);

    this.deleteDocumentByIdHandler = this.deleteDocumentByIdHandler.bind(this);
  }

  async postDocumentHandler(req, res, next) {
    try {
      const documentId = await this._service.addDocument(req.auth.id, req.file);

      return res.status(201).json({
        status: "success",
        data: {
          id: documentId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getDocumentsHandler(req, res, next) {
    try {
      const documents = await this._service.getDocuments();

      return res.json({
        status: "success",
        data: {
          documents,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getDocumentByIdHandler(req, res, next) {
    try {
      const document = await this._service.getDocumentById(req.params.id);

      return res.json({
        status: "success",
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteDocumentByIdHandler(req, res, next) {
    try {
      await this._service.deleteDocumentById(req.params.id);

      return res.json({
        status: "success",
        message: "Document deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DocumentsHandler;
