require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Token is not valid",
          token,
          secret: process.env.SECRET,
        });
      } else {
        req.auth = auth;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "Auth Token is not supplied",
    });
  }
};

module.exports = checkJWT;
