const express = require("express");

const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");
const postRouter = require("./Routers/postRouter");
const commentRouter = require("./Routers/commentRouter");
const imageRouter = require("./Routers/imageRouter");
const AppError = require("./Utils/appError");

const app = express();

app.use(express.json());

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/image", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
