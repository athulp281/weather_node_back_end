const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || "weather",
    process.env.MYSQL_USER || "root",
    process.env.MYSQL_PASSWORD || "root",
    {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 3306,
        dialect: "mysql",
    }
);

module.exports = sequelize;
