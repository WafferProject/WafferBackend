const { sequelize, DataTypes } = require("../config/db_config");

const WorkPhone = sequelize.define(
  "WorkPhone",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BuisnessTaxRegistrationNumber:{
      type: DataTypes.INTEGER,
      allowNull:false,
      field:"BuisnessTaxRegistrationNumber"
    }
  },
  {
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
  }
);

module.exports = { WorkPhone };
