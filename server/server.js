const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postsRouter");
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
