const { nanoid } = require("nanoid");

const pool = require("../../utils/database");

const NotFoundError = require("../../commons/exceptions/NotFoundError");

class ApplicationsService {
  async addApplication(payload) {
    const id = `application-${nanoid(16)}`;

    const { user_id, job_id, status } = payload;

    const query = {
      text: `
      INSERT INTO applications
      VALUES($1,$2,$3,$4,$5)
      RETURNING id
    `,
      values: [id, user_id, job_id, status, new Date()],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  }

  async getApplications() {
    const query = {
      text: `
        SELECT *
        FROM applications
        ORDER BY created_at DESC
      `,
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async getApplicationById(id) {
    const query = {
      text: `
        SELECT *
        FROM applications
        WHERE id=$1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Application not found");
    }

    return result.rows[0];
  }

  async getApplicationsByUser(userId) {
    const query = {
      text: `
        SELECT *
        FROM applications
        WHERE user_id=$1
      `,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async getApplicationsByJob(jobId) {
    const query = {
      text: `
        SELECT *
        FROM applications
        WHERE job_id=$1
      `,
      values: [jobId],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async editApplicationById(id, status) {
    const query = {
      text: `
        UPDATE applications
        SET status=$1
        WHERE id=$2
        RETURNING id
      `,
      values: [status, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Application not found");
    }
  }

  async deleteApplicationById(id) {
    const query = {
      text: `
        DELETE FROM applications
        WHERE id=$1
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Application not found");
    }
  }
}

module.exports = ApplicationsService;
