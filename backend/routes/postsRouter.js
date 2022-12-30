const express = require("express");
const Post = require("../classes/Post");
const Comment = require("../classes/Comment");
const db = require("../db");
const Kind = require("../kind");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const taskKey = db.key([Kind.POSTS, id]);

  db.get(taskKey).then((result) => {
    const post = result[0];
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send({ message: "Post doesn't exists" });
    }
  });

  // const posts = await db.collection("posts");
  // var post = await posts.where("id", "==", id).get();

  // if (post.empty) {
  //   res.status(404).send("Post doesn't exists");
  //   return;
  // }

  // post.forEach((doc) => {
  //   post = doc.data();
  //   return;
  // });

  // res.status(200).send(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const taskKey = db.key([Kind.POSTS, id]);

  db.delete(taskKey)
    .then((resp) => {
      res.send({ message: "Post Deleted" });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/", async (req, res) => {
  const query = db.createQuery(Kind.POSTS);

  db.runQuery(query)
    .then((results) => {
      const posts = results[0];
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(200).send({ error: err.message });
    });

  // const posts = await db.collection("posts").get();
  // let obj = {};
  // posts.forEach((post) => {
  //   obj[post.id] = post.data();
  // });
  // res.status(200).send(obj);
});

router.post("/", async (req, res) => {
  const { title, description, location, postedBy } = req.body;

  const post = new Post(title, description, location, postedBy);
  const resp = await db.saveData(Kind.POSTS, post.id, post);

  res.status(201).send(resp);

  // const posts = await db.collection("posts");
  // const post = new Post(title, description, location, postedBy);
  // await posts.doc(post.id).set({ ...post });

  // res.status(201).send(post);
});

router.post("/:id/like", async (req, res) => {
  const { userId } = req.body; // get it from req.user ( middleware )
  const { id } = req.params;
  const taskKey = db.key([Kind.POSTS, id]);

  let liked = false;

  var [post] = await db.get(taskKey);

  if (!post.likes[userId]) {
    delete post.dislikes[userId]; // if disliked
    post.likes[userId] = true;
    liked = true;
  } else delete post.likes[userId];

  await db
    .update(post)
    .then(() => {
      // if (liked) res.send({ message: "Post Liked " });
      // else res.send({ message: "Post Unliked " });
      res.send(post);
    })
    .catch((e) => res.status(500).status({ message: e.message }));
});

router.post("/:id/dislike", async (req, res) => {
  const { userId } = req.body; // get it from req.user ( middleware )
  const { id } = req.params;
  const taskKey = db.key([Kind.POSTS, id]);

  let dislike = false;

  var [post] = await db.get(taskKey);

  if (!post.dislikes[userId]) {
    delete post.likes[userId];
    post.dislikes[userId] = true;
    dislike = true;
  } else delete post.dislikes[userId];

  await db
    .update(post)
    .then(() => {
      // if (dislike) res.send({ message: "Post disliked " });
      // else res.send({ message: "Post Undisliked " });
      res.send(post);
    })
    .catch((e) => res.status(500).status({ message: e.message }));
});

router.post("/:id/comment", async (req, res) => {
  const { userId, name, email, comment } = req.body; // get it from req.user ( middleware )
  const { id } = req.params;
  let userComment = new Comment(name, email, comment);
  const taskKey = db.key([Kind.POSTS, id]);

  var [post] = await db.get(taskKey);

  post.comments[userComment.id] = userComment;

  await db
    .update(post)
    .then(() => {
      res.send(post);
    })
    .catch((e) => res.status(500).status(post));
});

router.delete("/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { userId, commentId } = req.body;

  const taskKey = db.key([Kind.POSTS, id]);

  var [post] = await db.get(taskKey);

  // console.log(post.comments[commentId]);
  let comment = post.comments[commentId];
  // if(comment.email !== userId) res.status(401).status({message: "Unauthorized"})
  // allow admin and user who created comment to delete

  delete post.comments[commentId];

  await db
    .update(post)
    .then(() => {
      res.send(post);
    })
    .catch((e) => res.status(500).status(post));
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;

  const taskKey = db.key([Kind.POSTS, id]);

  var [post] = await db.get(taskKey);

  post.title = title;
  post.description = description;
  post.location = location;

  await db
    .update(post)
    .then(() => {
      res.send(post);
    })
    .catch((e) => res.status(500).status(post));
});

module.exports = router;
