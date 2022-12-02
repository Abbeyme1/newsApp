import { v4 as uuidv4 } from "uuid";
import { Enum } from "../enums";

export class Post {
  constructor(title, description, location, postedBy) {
    this.id = uuidv4().slice(0, 8);
    this.title = title;
    this.description = description;
    this.location = location;
    this.likes = 0;
    this.dislikes = 0;
    this.comments = [];
    this.creationTime = new Date();
    this.postedBy = postedBy || Enum.ANONYMOUS;
  }
}
