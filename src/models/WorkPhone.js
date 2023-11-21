const { sequelize, DataTypes } = require("../config/db_config");


const WorkPhone = sequelize.define('WorkPhone', {
  work_phone_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tax_registration_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'WorkPhone',
  timestamps: false, // Assuming you don't want timestamps
});



module.exports = {WorkPhone};
