const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postsRouter");

app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
