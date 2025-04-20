const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require ('dotenv');
dotenv.config();

const sequelize = new Sequelize("company", "root", "root", {
  host: "localhost",  //process.env.DB_HOST
  dialect: "mysql",
});


module.exports = sequelize;
