const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    DB_SCHEMA,
    DB_USER,
    DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;