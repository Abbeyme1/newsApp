const jwt = require("jsonwebtoken");

const token = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const decode = (token) => {
  return jwt.decode(token, process.env.SECRET_KEY);
};

module.exports.token = token;
module.exports.decode = decode;
