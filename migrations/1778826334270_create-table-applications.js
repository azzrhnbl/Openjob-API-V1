exports.up = (pgm) => {
  pgm.createTable("applications", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },

    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    job_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "jobs(id)",
      onDelete: "CASCADE",
    },

    status: {
      type: "TEXT",
      default: "pending",
    },

    created_at: {
      type: "TIMESTAMP",
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("applications");
};
