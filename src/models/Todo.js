const db = require("../config/dbCon");
const { DataTypes } = require("sequelize");

const Todo = db.define("Todos", {
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Todo;
