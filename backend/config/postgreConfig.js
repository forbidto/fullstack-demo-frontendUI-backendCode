const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// PostgreSQL Pool Configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err);
  } else {
    console.log('Connected to PostgreSQL database using pg');
  }
});

// Sequelize Configuration
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
  port: process.env.PG_PORT,
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully using Sequelize.');
  })
  .catch(err => {
    console.error('Unable to connect to the database using Sequelize:', err);
  });

module.exports = { pool, sequelize };