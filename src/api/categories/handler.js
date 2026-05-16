class CategoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCategoryHandler = this.postCategoryHandler.bind(this);

    this.getCategoriesHandler = this.getCategoriesHandler.bind(this);

    this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);

    this.putCategoryByIdHandler = this.putCategoryByIdHandler.bind(this);

    this.deleteCategoryByIdHandler = this.deleteCategoryByIdHandler.bind(this);
  }

  async postCategoryHandler(req, res, next) {
    try {
      this._validator.validateCategoryPayload(req.body);

      const { name } = req.body;

      const categoryId = await this._service.addCategory({ name });

      return res.status(201).json({
        status: "success",
        data: {
          id: categoryId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoriesHandler(req, res, next) {
    try {
      const categories = await this._service.getCategories();

      return res.json({
        status: "success",
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryByIdHandler(req, res, next) {
    try {
      const category = await this._service.getCategoryById(req.params.id);

      return res.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async putCategoryByIdHandler(req, res, next) {
    try {
      this._validator.validateCategoryPayload(req.body);

      const { name } = req.body;

      await this._service.editCategoryById(req.params.id, { name });

      return res.json({
        status: "success",
        message: "Category updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoryByIdHandler(req, res, next) {
    try {
      await this._service.deleteCategoryById(req.params.id);

      return res.json({
        status: "success",
        message: "Category deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesHandler;
