const uuidv4 = require("uuid").v4;

class Comment {
  constructor(name, email, comment) {
    this.id = uuidv4().slice(0, 8);
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.creationTime = new Date();
  }
}

module.exports = Comment;
