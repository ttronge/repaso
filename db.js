const { Sequelize } = require("sequelize");
const db = new Sequelize("postgres://postgres@localhost:5432/duermo", {
  logging: false,
}); // Example for postgres

module.exports = db;
