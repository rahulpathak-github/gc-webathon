const express = require("express");
const app = express();

app.use(express.json());

//ROUTES

app.all("*", (req, res, next) => {
  console.log(req);
  res.status(200).json({
    status: "success",
  });
});

module.exports = app;
