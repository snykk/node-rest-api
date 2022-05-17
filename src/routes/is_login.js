var jwt = require("jsonwebtoken");

module.exports = {
  isLogin: (req, res, next) => {
    // console.log(req.headers)
    if (!req.headers.authorization) {
      return res.status(401).json({
        is_ok: false,
        message: "Authorization Header missing",
      });
    }
    let authorization = req.headers.authorization;
    let token = authorization.split(" ")[1];
    // console.log(token);

    let jwtData;

    try {
      jwtData = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        is_ok: false,
        message: "Invalid Token.",
      });
    }

    req.user = jwtData.user;
    next();
  },
};
