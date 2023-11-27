const { sequelize, DataTypes } = require("../config/db_config");
const { Offer } = require("./Offer");

const PlaceOrder = sequelize.define(
  "placeOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },
    offer_id :{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OfferId",
    } , 
    tax_registration_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OfferBuisnessTaxRegistrationNumber",
    },
    consumer_email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "ConsumerEmail",
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
    // underscored: true,
    timestamps: false,
  } ,

);

PlaceOrder.belongsTo(Offer) ;
Offer.hasMany(PlaceOrder) ; 


module.exports = { PlaceOrder };
