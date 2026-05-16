const { Pool } = require("pg");
const { nanoid } = require("nanoid");

const InvariantError = require("../../commons/exceptions/InvariantError");
const NotFoundError = require("../../commons/exceptions/NotFoundError");

class JobsService {
  constructor() {
    this._pool = new Pool();
  }

  async addJob({
    title,
    description,
    company_id,
    category_id,
    job_type,
    experience_level,
    location_type,
    location_city = null,
    salary_min = 0,
    salary_max = 0,
    is_salary_visible = false,
    status,
  }) {
    const id = `job-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO jobs (
          id,
          title,
          description,
          company_id,
          category_id,
          job_type,
          experience_level,
          location_type,
          location_city,
          salary_min,
          salary_max,
          is_salary_visible,
          status
        )
        VALUES(
          $1,$2,$3,$4,$5,$6,
          $7,$8,$9,$10,$11,$12,$13
        )
        RETURNING id
      `,
      values: [
        id,
        title,
        description,
        company_id,
        category_id,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Job gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getJobs(title = "", companyName = "") {
    const values = [];
    const conditions = [];

    let queryText = `
    SELECT
      jobs.id,
      jobs.company_id,
      jobs.category_id,
      jobs.title,
      jobs.description,
      jobs.job_type,
      jobs.experience_level,
      jobs.location_type,
      jobs.location_city,
      jobs.salary_min,
      jobs.salary_max,
      jobs.is_salary_visible,
      jobs.status,
      companies.name AS company_name
    FROM jobs
    LEFT JOIN companies
    ON jobs.company_id = companies.id
  `;

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`jobs.title ILIKE $${values.length}`);
    }

    if (companyName) {
      values.push(`%${companyName}%`);
      conditions.push(`companies.name ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await this._pool.query({
      text: queryText,
      values,
    });

    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Job tidak ditemukan");
    }

    return result.rows[0];
  }

  async getJobsByCompanyId(companyId) {
    const query = {
      text: `
        SELECT * FROM jobs
        WHERE company_id = $1
      `,
      values: [companyId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getJobsByCategoryId(categoryId) {
    const query = {
      text: `
        SELECT * FROM jobs
        WHERE category_id = $1
      `,
      values: [categoryId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async editJobById(id, payload) {
    const currentJob = await this.getJobById(id);

    const {
      title = currentJob.title,
      description = currentJob.description,
      company_id = currentJob.company_id,
      category_id = currentJob.category_id,
      job_type = currentJob.job_type,
      experience_level = currentJob.experience_level,
      location_type = currentJob.location_type,
      location_city = currentJob.location_city,
      salary_min = currentJob.salary_min,
      salary_max = currentJob.salary_max,
      is_salary_visible = currentJob.is_salary_visible,
      status = currentJob.status,
    } = payload;

    const query = {
      text: `
      UPDATE jobs
      SET
        title = $1,
        description = $2,
        company_id = $3,
        category_id = $4,
        job_type = $5,
        experience_level = $6,
        location_type = $7,
        location_city = $8,
        salary_min = $9,
        salary_max = $10,
        is_salary_visible = $11,
        status = $12
      WHERE id = $13
      RETURNING id
    `,
      values: [
        title,
        description,
        company_id,
        category_id,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
        id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui job");
    }
  }

  async deleteJobById(id) {
    const query = {
      text: `
        DELETE FROM jobs
        WHERE id = $1
        RETURNING id
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Job gagal dihapus");
    }
  }
}

module.exports = JobsService;
