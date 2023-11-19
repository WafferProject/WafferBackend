// Import Sequelize library and connection

const { sequelize , DataTypes } = require("../config/db_config");

// Define the Consumer model
sequelize
const Consumer = sequelize.define(
  "Consumer",
  {
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.ENUM("student", "employed"),
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
  console.log("sync with consumer success ");
})
.catch(err=>{
  console.log(err);
})
// Export the Consumer model
module.exports = {Consumer};
