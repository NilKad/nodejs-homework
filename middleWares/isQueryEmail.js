const { User } = require("../models");
const { requestError } = require("../utils");

const isQueryEmail = async (req, res, next) => {
  const { email } = req.body;
  const isFoundEmail = await User.findOne({ email: email });
  if (isFoundEmail) {
    console.log("Email alredy registered");
    const err = requestError(409, `Email ${email} arledy register`);
    next(err);
  }
  next();
};

module.exports = isQueryEmail;
