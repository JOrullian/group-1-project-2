const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This ensures that SSL is used
      rejectUnauthorized: false // This option is used if the server is using a self-signed certificate
    }
  },
  logging: false, // Set to true if you want to see SQL queries
});

module.exports = sequelize;
