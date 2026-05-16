const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const pool = require("../../utils/database");
const InvariantError = require("../../commons/exceptions/InvariantError");
const NotFoundError = require("../../commons/exceptions/NotFoundError");
const AuthenticationError = require("../../commons/exceptions/AuthenticationError");

class UsersService {
  async addUser({ name, email, password, role }) {
    const id = `user-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `
        INSERT INTO users
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
      `,
      values: [id, name, email, hashedPassword, role, new Date(), new Date()],
    };

    try {
      const result = await pool.query(query);

      return result.rows[0].id;
    } catch (error) {
      throw new InvariantError("Email already exists");
    }
  }

  async getUserById(id) {
    const query = {
      text: `
        SELECT
          id,
          name,
          email,
          role
        FROM users
        WHERE id=$1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("User not found");
    }

    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: `
        SELECT
          id,
          password
        FROM users
        WHERE email=$1
      `,
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError("Invalid credentials");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Invalid credentials");
    }

    return id;
  }
}

module.exports = UsersService;
