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



// function findUserByEmailAndPsswd(email, psswd) {
//   return new Promise((resolve, reject) => {
//     const sql = "SELECT *  FROM user WHERE email=? && password = ? ";
//     connection.query(sql, [email, psswd], (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// }
// function findBuisnessByEmailAndPsswd(email, psswd) {
//   return new Promise((resolve, reject) => {
//     const sql = "SELECT *  FROM buisness WHERE email=? && password = ? ";
//     connection.query(sql, [email, psswd], (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// }

// function findByID(id) {
//   return new Promise((resolve, reject) => {
//     const sql = "SELECT *  FROM user WHERE user_id= ?";
//     connection.query(sql, [id], (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// }
// function insertUserRec(infos) {
//   return new Promise((resolve, reject) => {
//     const sql =
//       "INSERT INTO user (first_name, last_name, email, phone_number, occupation, password) VALUES (?, ?, ?, ?, ?, ?)";
//     connection.query(sql, infos, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }
// function insertBuisnessRec(infos) {
//   return new Promise((resolve, reject) => {
//     const sql = `INSERT INTO buisness (email, name, password, location ,description, phone_number, tax_registration_number) VALUES (?, ?, ?,ST_GeomFromText( ? ),? ,?,?)`;
//     connection.query(sql, infos, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

// module.exports = {
//   findUserByEmailAndPsswd,
//   findByID,
//   insertUserRec,
//   insertBuisnessRec,
//   findBuisnessByEmailAndPsswd,
// };
module.exports = { connect_db , sequelize , DataTypes};
