const express = require("express");
const { Op } = require("sequelize");

const User = require("../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var { isLogin } = require("./is_login");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validasi inputan user
    if (!(username && password)) {
      res.status(400).json({
        is_ok: false,
        message: "All input is required",
      });
    }

    // cek jika username sudah ada di database
    const oldUser = await User.findOne({ where: { username: username } });

    if (oldUser) {
      return res.status(409).json({
        is_ok: false,
        message: `A user with username ${username} already exist`,
      });
    }

    var hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(200).send({
      is_oke: true,
      message: `New user '${newUser.username}' has been added`,
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      is_ok: false,
      message: "Internal server error",
    });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const registeredUser = await User.findOne({ where: { username: username } });

    if (registeredUser) {
      passwordMatched = await bcrypt.compare(password, registeredUser.password);

      if (passwordMatched) {
        // username dan password valid
        let { password, ...userWithoutPass } = registeredUser;

        let token = jwt.sign({ user: userWithoutPass }, process.env.TOKEN_KEY, {
          algorithm: "HS256",
          expiresIn: 86400, // expires in 24 hours
        });

        res.status(200).json({
          is_ok: true,
          message: "Login success",
          data: registeredUser,
          token: token,
        });
      } else {
        res.status(403).json({
          is_ok: false,
          message: "Wrong password",
        });
      }
    } else {
      //user not found associated with that mail
      res.status(403).json({
        is_ok: false,
        message: "Username is not registered",
      });
    }
  } catch (err) {
    res.status(500).json({
      is_ok: false,
      message: "Internal server error",
    });
    console.log(err);
  }
});

router.get("/itsme", isLogin, async (req, res, next) => {
  try {
    const user = req.user;
    const selectedUser = await User.findOne({ where: { username: user.dataValues.username } });

    if (selectedUser) {
      res.status(200).json({
        is_ok: true,
        message: "User Profile",
        data: user.dataValues,
      });
    }
  } catch (err) {
    res.status(500).json({
      is_ok: false,
      message: "Internal server error",
    });
    console.log(err);
  }
});

module.exports = router;
