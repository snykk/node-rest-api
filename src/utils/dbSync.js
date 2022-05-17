const db = require("../config/dbCon");
const Task = require("../models/Todo");
const User = require("../models/User");

module.exports = () => {
  db.sync();
};
