const { nanoid } = require("nanoid");

const pool = require("../../utils/database");

const NotFoundError = require("../../commons/exceptions/NotFoundError");

class CompaniesService {
  async addCompany({ name, location, description }) {
    const id = `company-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO companies
        VALUES($1,$2,$3,$4,$5)
        RETURNING id
      `,
      values: [id, name, location, description, new Date()],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  }

  async getCompanies() {
    const query = {
      text: `
        SELECT *
        FROM companies
        ORDER BY created_at DESC
      `,
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: `
        SELECT *
        FROM companies
        WHERE id=$1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Company not found");
    }

    return result.rows[0];
  }

  async editCompanyById(id, { name, location, description }) {
    const query = {
      text: `
        UPDATE companies
        SET
          name=$1,
          location=$2,
          description=$3
        WHERE id=$4
        RETURNING id
      `,
      values: [name, location, description, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Company not found");
    }
  }

  async deleteCompanyById(id) {
    const query = {
      text: `
        DELETE FROM companies
        WHERE id=$1
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Company not found");
    }
  }
}

module.exports = CompaniesService;
