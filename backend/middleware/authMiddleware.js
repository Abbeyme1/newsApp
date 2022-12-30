const express = require("express");
const router = express();

const admin = (req, res, next) => {
  console.log(req.user);

  next();
  // if (req.user && req.user.admin) {
  //   next();
  // } else {
  //   res.status(401);
  //   throw new Error("Unauthorized");
  // }
};

module.exports.admin = admin;
