const { User } = require("../../models");
const { requestError } = require("../../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const loginWrong = () => {
  const err = requestError(401, `Email or password is wrong`);
  throw err;
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const userFromBase = await User.findOne({ email: email });

  !userFromBase && loginWrong();
  const isCorrectPassword = bcrypt.compareSync(password, userFromBase.password);
  !isCorrectPassword && loginWrong();

  const payload = { id: userFromBase._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(userFromBase._id, { token });
  res.status(200).json({
    code: 200,
    message: "auth ok",
    data: {
      // name: userFromBase.name,
      email: userFromBase.email,
      subscription: userFromBase.subscription,
      token,
    },
  });
};

module.exports = signin;
