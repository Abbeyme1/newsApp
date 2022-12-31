const db = require("../db");
const { decode } = require("../jwt");
const Kind = require("../kind");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      let { id, email } = decode(token);

      const taskKey = db.key([Kind.USERS, email]);

      let user = await db.get(taskKey).then((user) => user[0]);
      delete user["password"];

      if (user && user.id === id) req.user = user;
      else throw new Error("invalid token");
    } catch (e) {
      return res.status(401).send({ message: "Unauthorized, Token Failed" });
    }
  }

  if (!token) {
    return res.status(401).send({ message: "Unauthorized, Token Unavailable" });
  } else next();
};

const admin = (req, res, next) => {
  if (req.user && req.user.admin) next();
  else return res.status(401).send({ message: "Not Authorized as Admin" });
};

module.exports.protect = protect;
module.exports.admin = admin;
