const { User } = require("../../models");
const { requestError } = require("../../utils");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const isFoundEmail = await User.findOne({ email: email });
  if (isFoundEmail) {
    console.log("Email alredy registered");
    const err = requestError(409, `Email ${email} arledy register`);
    throw err;
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(password);
  const user = await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: 201,
    message: "User registered",
    user: {
      email: user.email,
      subscription: user.subscription,
      token: user.token,
    },
  });
};

module.exports = signup;
