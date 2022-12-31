const uuidv4 = require("uuid").v4;

class User {
  constructor(name, email, password) {
    this.id = uuidv4().slice(0, 8);
    this.name = name;
    this.email = email;
    this.password = this.hashPassword(password);
    this.admin = false;
  }

  hashPassword(password) {
    // logic
    var hash = password;

    return hash;
  }

  checkPassword(password) {
    return this.password === password;
  }
}

module.exports = User;
