const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.URL, {
  dialect: "mysql",
  logging:false
});

const connect_db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("db connected successfully");
  } catch (err) {
    console.log("db failed to init :  " + err);
  }
};

module.exports = { connect_db, sequelize, DataTypes };
