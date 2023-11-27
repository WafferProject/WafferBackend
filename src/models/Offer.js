const { sequelize, DataTypes } = require("../config/db_config");
const {PlaceOrder} = require("./PlaceOrder");

const Offer = sequelize.define(
  "Offer",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tax_registration_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "BuisnessTaxRegistrationNumber",
    },
    old_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    new_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

// Define foreign key association

// Offer.hasMany(PlaceOrder
// );

// PlaceOrder.belongsTo(Offer, {
//   foreignKeyConstraint:true,
//   constraints:true,
//   onDelete: "CASCADE",
//   onUpdate: "NO ACTION",
// });



module.exports = { Offer };
