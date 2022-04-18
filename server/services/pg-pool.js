const pg = require('pg');

function pgPool() {
  return new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

module.exports = pgPool;
