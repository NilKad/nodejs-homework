// const { log } = require("console");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { requestError } = require("../utils");

const { SECRET_KEY } = process.env;

const errorNotAutorized = () => {
  const err = requestError(401, "Not autorized");
  throw err;
};

const errorTokenExpired = (error) => {
  if (error.message === "jwt expired") {
    const err = requestError(500, "token expired");
    throw err;
  }
};

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  bearer !== "Bearer" && errorNotAutorized();

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne(
      { _id: id },
      "-password -createdAt -updatedAt"
    );

    (!user || user.token !== token) && errorNotAutorized();

    req.user = user;
  } catch (error) {
    errorTokenExpired(error);
    throw error;
  }
  next();
};

module.exports = auth;
