const express = require("express");
const { Op } = require("sequelize"); // wildcard operator

const User = require("../models/User");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      is_ok: true,
      message: "Users succesfully fetched!",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    console.log(error);
  }
});

module.exports = router;
