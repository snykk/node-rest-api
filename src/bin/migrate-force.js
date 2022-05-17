require("dotenv").config();
const db = require("../config/db");
const Task = require("../models/Todo");
const User = require("../models/User");

db.sync({ force: true });
