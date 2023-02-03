// const { User } = require("../../models");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { requestError } = require("../utils");

const { SECRET_KEY } = process.env;

const notAutorized = () => {
  const err = requestError(401, "Not autorized");
  throw err;
};

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  bearer !== "Bearer" && notAutorized();

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("!!!!!!!!");
    const user = await User.findOne(
      { _id: id },
      "-password -createdAt -updatedAt"
    );

    (!user || user.token !== token) && notAutorized();

    req.user = user;
    console.log("!!! req.user: ", req.user);
  } catch (error) {
    log("!!!!!!????? Error");
    if (error.message === "jwt expired") {
      const err = requestError(500, "token expired");
      throw err;
    }
    throw error;
  }
  console.log("@@@@@@@@");
  next();
};

module.exports = auth;
