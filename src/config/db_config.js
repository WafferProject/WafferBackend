const {Sequelize, DataTypes} = require("sequelize");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();



const sequelize = new Sequelize(process.env.URL, {
  dialect: "mysql",
});

const connect_db = async () => {
  try {
   await sequelize.authenticate();
    console.log("db connected successfully")
  } catch (err) {
    console.log("db failed to init :  " + err);
  }
};


module.exports = { connect_db , sequelize , DataTypes};
