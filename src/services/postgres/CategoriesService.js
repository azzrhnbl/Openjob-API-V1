const { Pool } = require("pg");
const { nanoid } = require("nanoid");

const NotFoundError = require("../../commons/exceptions/NotFoundError");
const InvariantError = require("../../commons/exceptions/InvariantError");

class CategoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCategory({ name }) {
    const id = `category-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO categories (id, name)
        VALUES($1, $2)
        RETURNING id
      `,
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Kategori gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getCategories() {
    const query = {
      text: "SELECT * FROM categories",
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Category not found");
    }

    return result.rows[0];
  }

  async verifyCategoryExists(id) {
    const query = {
      text: "SELECT id FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Category not found");
    }
  }

  async editCategoryById(id, { name }) {
    const query = {
      text: `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING id
    `,
      values: [name, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Category not found");
    }
  }

  async deleteCategoryById(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Category not found");
    }
  }
}

module.exports = CategoriesService;
