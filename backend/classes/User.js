class User {
  constructor(name, email, password) {
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
