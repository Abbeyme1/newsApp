const Enum = require("../enums");
const uuidv4 = require("uuid").v4;

class Post {
  constructor(title, description, location, postedBy) {
    this.id = uuidv4().slice(0, 8);
    this.title = title;
    this.description = description;
    this.location = location;
    this.likes = {};
    this.dislikes = {};
    this.comments = {};
    this.creationTime = new Date();
    this.postedBy = postedBy || Enum.ANONYMOUS;
  }
}

module.exports = Post;
