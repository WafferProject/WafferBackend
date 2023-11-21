const { sequelize, DataTypes } = require("../config/db_config");


const PlaceOrder = sequelize.define(
  "placeOrder",
  {
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tax_registration_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    consumer_email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

// Define foreign key associations





module.exports = {PlaceOrder};
