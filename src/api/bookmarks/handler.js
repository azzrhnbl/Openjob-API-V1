class BookmarksHandler {
  constructor(service) {
    this._service = service;

    this.postBookmarkHandler = this.postBookmarkHandler.bind(this);

    this.getBookmarkByIdHandler = this.getBookmarkByIdHandler.bind(this);

    this.getBookmarksHandler = this.getBookmarksHandler.bind(this);

    this.deleteBookmarkHandler = this.deleteBookmarkHandler.bind(this);
  }

  async postBookmarkHandler(req, res, next) {
    try {
      const bookmarkId = await this._service.addBookmark(
        req.auth.id,
        req.params.jobId,
      );

      return res.status(201).json({
        status: "success",
        data: {
          id: bookmarkId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookmarkByIdHandler(req, res, next) {
    try {
      const bookmark = await this._service.getBookmarkById(req.params.id);

      return res.json({
        status: "success",
        data: bookmark,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookmarksHandler(req, res, next) {
    try {
      const bookmarks = await this._service.getBookmarks(req.auth.id);

      return res.json({
        status: "success",
        data: {
          bookmarks,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBookmarkHandler(req, res, next) {
    try {
      await this._service.deleteBookmark(req.auth.id, req.params.jobId);

      return res.json({
        status: "success",
        message: "Bookmark deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarksHandler;
