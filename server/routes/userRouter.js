const express = require("express");
const User = require("../classes/User");
const db = require("../db");
const { token } = require("../jwt");
const Kind = require("../kind");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const taskKey = db.key([Kind.USERS, email]);

  db.get(taskKey)
    .then((result) => {
      const user = result[0];
      if (user) {
        return Promise.reject({ code: 422, message: "User Already Exists" });
      } else {
        const newUser = new User(name, email, password);
        return db.saveData(Kind.USERS, newUser.email, newUser);
      }
    })
    .then((result) => {
      const userToken = token({ id: result.id, email: email });
      delete result["password"];
      res.status(201).send({ token: userToken, user: result });
    })
    .catch((err) => {
      const errorCode = err.code ? err.code : 500;
      res.status(errorCode).send({ message: err.message });
    });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const taskKey = db.key([Kind.USERS, email]);

  db.get(taskKey)
    .then((result) => {
      const user = result[0];
      if (user) {
        if (user.password === password) return user;
        else
          return Promise.reject({ code: 401, message: "Wrong email/password" });
      } else {
        return Promise.reject({ code: 404, message: "User doesn't Exists" });
      }
    })
    .then((result) => {
      const userToken = token({ id: result.id, email: email });
      delete result["password"];
      res.status(201).send({ token: userToken, user: result });
    })
    .catch((err) => {
      const errorCode = err.code ? err.code : 500;
      res.status(errorCode).send({ message: err.message });
    });

  // const users = await db.collection("users");
  // var user = await users.where("email", "==", email).get();

  // if (user.empty) {
  //   res.status(404).send("User doesn't exists");
  //   return;
  // }

  // var user = await users
  //   .where("email", "==", email)
  //   .where("password", "==", password)
  //   .get();

  // if (user.empty) {
  //   res.status(401).send("wrong email/password");
  // } else {
  //   user.forEach((doc) => {
  //     user = doc.data();
  //     return;
  //   });

  //   res.status(200).send(user);
  // }
});

// GET ALL USER
router.get("/", protect, admin, async (req, res) => {
  const query = db.createQuery(Kind.USERS);

  db.runQuery(query)
    .then((results) => {
      const users = results[0];
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(200).send({ error: err.message });
    });
});

// GET PARTICULAR USER
router.get("/:id", protect, admin, async (req, res) => {
  const { id } = req.params;
  const taskKey = db.key([Kind.USERS, id]);

  db.get(taskKey).then((result) => {
    const user = result[0];
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User doesn't exists" });
    }
  });
});

// UPDATE USER
router.put("/update/:id", protect, admin, async (req, res) => {
  const { id } = req.params;
  const { name, email, admin } = req.body;

  if (id !== email) {
    // check if email already exists
    var taskKey = db.key([Kind.USERS, email]);

    var [user] = await db.get(taskKey);
    console.log(user);
    if (user) return res.status(409).send({ message: "Email Already In Use" });

    var taskKey = db.key([Kind.USERS, id]);

    var [user] = await db.get(taskKey);
    await db.delete(taskKey);

    user.name = name;
    user.email = email;
    user.admin = admin;

    try {
      const resp = await db.saveData(Kind.USERS, email, user);
      res.status(200).send(resp);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  } else {
    const taskKey = db.key([Kind.USERS, id]);

    var [user] = await db.get(taskKey);

    user.name = name;
    user.email = email;
    user.admin = admin;

    await db
      .update(user)
      .then(() => {
        res.send(user);
      })
      .catch((e) => res.status(500).status({ message: e.message }));
  }
});

module.exports = router;
