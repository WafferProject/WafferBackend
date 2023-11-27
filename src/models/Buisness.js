const { sequelize, DataTypes } = require("../config/db_config");
const { Offer } = require("./Offer");
const { WorkPhone } = require("./WorkPhone");

const Buisness = sequelize.define(
  "Buisness",
  {
    tax_registration_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    opening_time: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    closing_time: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

// // Buisness offer association 
// Buisness.hasMany(Offer,{
// });
// Offer.belongsTo(Buisness, {
//   onDelete: "CASCADE",
//   onUpdate: "NO ACTION",
// });

// // buisness phone association
// Buisness.hasMany(WorkPhone);
// WorkPhone.belongsTo(Buisness, {
//   onDelete: "CASCADE",
//   onUpdate: "NO ACTION",
// });



module.exports = { Buisness };
