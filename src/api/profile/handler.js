class ProfileHandler {
  constructor(service) {
    this._service = service;

    this.getProfileHandler = this.getProfileHandler.bind(this);

    this.getProfileApplicationsHandler =
      this.getProfileApplicationsHandler.bind(this);

    this.getProfileBookmarksHandler =
      this.getProfileBookmarksHandler.bind(this);
  }

  async getProfileHandler(req, res, next) {
    try {
      const profile = await this._service.getProfile(req.auth.id);

      return res.json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfileApplicationsHandler(req, res, next) {
    try {
      const applications = await this._service.getProfileApplications(
        req.auth.id,
      );

      return res.json({
        status: "success",
        data: {
          applications,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfileBookmarksHandler(req, res, next) {
    try {
      const bookmarks = await this._service.getProfileBookmarks(req.auth.id);

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
}

module.exports = ProfileHandler;
