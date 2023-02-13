const { User } = require("../../models");
const { requestError } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../services");

const signup = async (req, res, next) => {
  console.log("!!!!! signup");
  const { email, password } = req.body;

  const isFoundEmail = await User.findOne({ email: email });
  if (isFoundEmail) {
    console.log("Email alredy registered");
    const err = requestError(409, `Email ${email} arledy register`);
    throw err;
  }

  const verificationToken = v4();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  sendEmail(email, verificationToken);

  res.status(201).json({
    status: 201,
    message: "User registered",
    user,
    // email: user.email,
    // subscription: user.subscription,
    // token: user.token,
    // avatarURL: user.avatarURL,
    // verificationToken: verificationToken,
    // },
  });
};

module.exports = signup;
