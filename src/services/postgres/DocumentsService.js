const { nanoid } = require("nanoid");

const pool = require("../../utils/database");

const NotFoundError = require("../../commons/exceptions/NotFoundError");

class DocumentsService {
  async addDocument(userId, file) {
    const id = `document-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO documents
        VALUES($1,$2,$3,$4,$5)
        RETURNING id
      `,
      values: [id, userId, file.filename, file.path, new Date()],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  }

  async getDocuments() {
    const query = {
      text: `
        SELECT *
        FROM documents
        ORDER BY created_at DESC
      `,
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async getDocumentById(id) {
    const query = {
      text: `
        SELECT *
        FROM documents
        WHERE id=$1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Document not found");
    }

    return result.rows[0];
  }

  async deleteDocumentById(id) {
    const query = {
      text: `
        DELETE FROM documents
        WHERE id=$1
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Document not found");
    }
  }
}

module.exports = DocumentsService;
