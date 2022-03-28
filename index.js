const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

//MONGODB connection
mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log("MongoDB connection established successfully !");
});

// SERVER
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} ...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
