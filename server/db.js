const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'hotwheels',
    database: 'superheroes',
    port: 5432,
});

module.exports = db;