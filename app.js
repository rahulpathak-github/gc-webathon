const express = require("express");
const cors = require("cors");
const path = require("path");

const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");
const postRouter = require("./Routers/postRouter");
const imageRouter = require("./Routers/imageRouter");
const commentRouter = require("./Routers/commentRouter");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./Controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());

// REACT BUILD for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/image", imageRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
