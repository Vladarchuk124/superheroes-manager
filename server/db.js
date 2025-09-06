const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'superheroes',
    port: 5432,
});

module.exports = db;
