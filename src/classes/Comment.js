import { v4 as uuidv4 } from "uuid";

export class Comment {
  constructor(name, email, comment) {
    this.id = uuidv4().slice(0, 8);
    this.name = name;
    this.email = email;
    this.comment = comment;
  }
}
