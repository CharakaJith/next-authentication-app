require('dotenv').config({
  path: process.env.ENV_PATH || '.env',
});

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    connections: process.env.PG_MAXCONN,
    dialect: 'postgres',
  },
  qa: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    connections: process.env.PG_MAXCONN,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    connections: process.env.PG_MAXCONN,
    dialect: 'postgres',
  },
  test: {
    username: process.env.PG_USER || 'test',
    password: process.env.PG_PASSWORD || 'test',
    database: process.env.PG_DATABASE || 'test_db',
    host: process.env.PG_HOST || 'localhost',
    connections: 1,
    dialect: 'sqlite',
  },
};
