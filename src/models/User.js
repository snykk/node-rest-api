const db = require("../config/dbCon");
const { DataTypes } = require("sequelize");

const User = db.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
