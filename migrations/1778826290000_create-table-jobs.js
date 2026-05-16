exports.up = (pgm) => {
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },

    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },

    category_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },

    title: {
      type: "TEXT",
      notNull: true,
    },

    description: {
      type: "TEXT",
      notNull: true,
    },

    job_type: {
      type: "TEXT",
      notNull: true,
    },

    experience_level: {
      type: "TEXT",
      notNull: true,
    },

    location_type: {
      type: "TEXT",
      notNull: true,
    },

    location_city: {
      type: "TEXT",
    },

    salary_min: {
      type: "INTEGER",
    },

    salary_max: {
      type: "INTEGER",
    },

    is_salary_visible: {
      type: "BOOLEAN",
      notNull: true,
    },

    status: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("jobs");
};
