var jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthentication = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const TOKEN = auth.split(" ")[1];
    jwt.verify(TOKEN, process.env.ACCESS_TOKEN, TOKEN, function (err, decoded) {
      if (err) {
        return res.send({ status: '401', msg: "Unathorized Access" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send({ status: 401, msg: "Unathorized Access!" });
  }
};

module.exports = jwtAuthentication;