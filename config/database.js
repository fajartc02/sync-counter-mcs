require("dotenv").config();
console.log(`{
        host: ${process.env.DB_HOST},
        port: ${process.env.DB_PORT},
        user: ${process.env.DB_USER},
        database: ${process.env.DB_NAME},
        password: ${process.env.DB_PASSWORD},
    }`);

const knex = require("knex")({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    },
});

module.exports = knex;