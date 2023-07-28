// const dotenv = require('dotenv');
// dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERID,
    process.env.DB_PSWD, {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost"
});

module.exports = sequelize;