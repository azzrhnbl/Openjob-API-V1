const { nanoid } = require("nanoid");

const pool = require("../../utils/database");

const NotFoundError = require("../../commons/exceptions/NotFoundError");

class BookmarksService {
  async addBookmark(userId, jobId) {
    const id = `bookmark-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO bookmarks
        VALUES($1,$2,$3)
        RETURNING id
      `,
      values: [id, userId, jobId],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  }

  async getBookmarkById(id) {
    const query = {
      text: `
        SELECT *
        FROM bookmarks
        WHERE id=$1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Bookmark not found");
    }

    return result.rows[0];
  }

  async getBookmarks(userId) {
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

  async deleteBookmark(userId, jobId) {
    const query = {
      text: `
        DELETE FROM bookmarks
        WHERE
          user_id=$1
          AND job_id=$2
        RETURNING id
      `,
      values: [userId, jobId],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Bookmark not found");
    }
  }
}

module.exports = BookmarksService;
