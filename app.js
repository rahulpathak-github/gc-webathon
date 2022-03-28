const express = require("express");

const postRouter = require("./Routers/postRouter");
const AppError = require("./Utils/appError");

const app = express();

app.use(express.json());

//ROUTES
app.use("/api/post", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
