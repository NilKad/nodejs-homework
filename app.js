const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
// const usersCurrentRouter = require("./routes/api/usersCurrent");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static(path.join(__dirname, "public")));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  console.log("!!!!! APP (req, res) !!!!!!");
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: "ERRR JSONS" });
});

app.use((err, req, res, next) => {
  console.log("!!!!! (err, req, resp, next) ");
  if (!err.status) err.status = 500;
  // console.log(err.data);
  // console.log("err: ", err);
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
