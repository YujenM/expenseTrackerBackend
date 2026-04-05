require("dotenv").config({ path: "../.env" });

const Sequelize = require("sequelize");

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: "postgres",
    useUTC: true,
    timezone: "+00:00",
    logging: console.log,
    dialectOptions: {
      connectTimeout: 60000,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      statement_timeout: 60000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 60000,
      idle: 30000,
      evict: 10000,
    },
    benchmark: true,
    retry: {
      max: 3,
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ENOTFOUND/,
      ],
    },
  },
  staging: {
    url: process.env.DB_URL,
    dialect: "postgres",
    useUTC: true,
    timezone: "+00:00",
    logging: (msg, queryTime) => console.log(`[SQL] ${msg} (${queryTime}ms)`),
    dialectOptions: {
      connectTimeout: 60000,
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
      statement_timeout: 60000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
    pool: {
      max: 15,
      min: 3,
      acquire: 60000,
      idle: 30000,
      evict: 10000,
    },
    benchmark: true,
    retry: {
      max: 5,
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ENOTFOUND/,
        /Connection terminated/,
      ],
    },
  },
  production: {
    url: process.env.DB_URL,
    dialect: "postgres",
    useUTC: true,
    timezone: "+00:00",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
      statement_timeout: 60000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 30000,
      evict: 5000,
    },
    benchmark: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    retry: {
      max: 8,
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ENOTFOUND/,
        /Connection terminated/,
        /Connection closed unexpectedly/,
      ],
    },
  },
  test: {
    url: process.env.DB_URL,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
