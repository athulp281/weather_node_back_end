const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE || "weather",
//     process.env.MYSQL_USER || "root",
//     process.env.MYSQL_PASSWORD || "root",
//     {
//         host: process.env.MYSQL_HOST || "localhost",
//         port: process.env.MYSQL_PORT || 3306,
//         dialect: "mysql",
//     }
// );

const sequelize = new Sequelize("i9872219_rmzl1", "weather", "Weather@123", {
    host: "118.139.179.50",
    port: "4000",
    dialect: "mysql",
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        connectTimeout: 900000, // increase timeout to 20 seconds
    },
});

module.exports = sequelize;
