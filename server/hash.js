const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function compare(enteredPassword, hash) {
  return bcrypt.compareSync(enteredPassword, hash);
}

module.exports.hashPassword = hashPassword;
module.exports.compare = compare;
