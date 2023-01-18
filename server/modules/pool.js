/**
* You'll need to use environment variables in order to deploy your
* pg-pool configuration to Heroku.
* It will look something like this:
**/

const pg = require('pg');
const url = require('url');
let config = {};
// server/modules/pool.js
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
console.log('What is my database URL?', process.env.DATABASE_URL);
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)

else {
    // only change the things on the right side of the ||
    config = {
        user: process.env.PG_USER || null, //env var: PGUSER
        password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
        host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
        port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
        database: process.env.DATABASE_NAME || 'saga_movies_weekend', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = new pg.Pool(config);