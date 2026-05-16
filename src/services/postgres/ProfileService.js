const pool = require("../../utils/database");

const NotFoundError = require("../../commons/exceptions/NotFoundError");

class ProfileService {
  async getProfile(userId) {
    const query = {
      text: `
        SELECT
          id,
          name,
          email,
          role,
          created_at
        FROM users
        WHERE id=$1
      `,
      values: [userId],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("User not found");
    }

    return result.rows[0];
  }

  async getProfileApplications(userId) {
    const query = {
      text: `
        SELECT
          applications.id,
          applications.status,
          jobs.title,
          companies.name
          AS company_name
        FROM applications
        JOIN jobs
          ON jobs.id =
          applications.job_id
        JOIN companies
          ON companies.id =
          jobs.company_id
        WHERE applications.user_id=$1
        ORDER BY applications.created_at DESC
      `,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async getProfileBookmarks(userId) {
    const query = {
      text: `
        SELECT
          bookmarks.id,
          jobs.title,
          jobs.location_city,
          companies.name
          AS company_name
        FROM bookmarks
        JOIN jobs
          ON jobs.id =
          bookmarks.job_id
        JOIN companies
          ON companies.id =
          jobs.company_id
        WHERE bookmarks.user_id=$1
      `,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  }
}

module.exports = ProfileService;
