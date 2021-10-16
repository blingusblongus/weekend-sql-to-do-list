const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
});

pool.on('connect', () => {
    console.log('connected to postgresql');
})

pool.on('error', (err) => {
    console.log('error connecting to postgresql', err);
});

module.exports = pool;