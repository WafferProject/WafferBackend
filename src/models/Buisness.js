const { sequelize, DataTypes } = require("../config/db_config");

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
      type: DataTypes.GEOMETRY('POINT'),
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

sequelize.sync().then(()=>{
    console.log("sync with buisness success ");
  })
  .catch(err=>{
    console.log(err);
  })

module.exports = {Buisness};
