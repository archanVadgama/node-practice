const jwt = require("jsonwebtoken");
const JWT_SECRET = "Arc@120480";

function setToken(user) {
  return jwt.sign(user, JWT_SECRET);
}

function getToken(token) {
  return jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      let errorMessage;
      switch (err.name) {
        case "TokenExpiredError":
          errorMessage = "Token has expired";
          break;
        case "JsonWebTokenError":
          errorMessage = "Invalid token";
          break;
        case "NotBeforeError":
          errorMessage = "Token not active";
          break;
        default:
          errorMessage = "Token verification failed";
      }
      return { status: false, msg: errorMessage };
    }
    return { status: true, msg: decoded };
  });
}

module.exports = {
  setToken,
  getToken,
};
