const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.globalnews = require("../models/globalnewsmodel.js")(sequelize, Sequelize);

module.exports = db;
