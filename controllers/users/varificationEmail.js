const { User } = require("../../models");

const varificationEmail = async (req, res, next) => {
  //
  const { verificationToken } = req.params;
  console.log("verificationToken: ", verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log("user: ", user);
  if (!user) {
    return res.status(404).json({ code: 404, message: "Not Found" });
  }
  if (user.verify) {
    return res.status(404).json({ code: 404, message: "Email alredy vrifed" });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({ code: 200, message: `Email: ${user.email} verifid` });
};

module.exports = varificationEmail;
