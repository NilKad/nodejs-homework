const { User } = require("../../models");
const { sendEmail } = require("../../utils");

const resendVerify = async (req, res, next) => {
  const { email: emailResend } = req.body;
  if (!emailResend) {
    return res.status(400).json({ code: 400, message: "Required enter email" });
  }
  const user = await User.findOne({ email: emailResend });
  if (!user) {
    console.log("email not found");
    return res
      .status(400)
      .json({ code: 400, message: `Email: ${emailResend} not found` });
  }
  if (user.verify) {
    return res.status(400).json({
      code: 400,
      message: `Email: ${emailResend} verification has already been passed`,
    });
  }
  const { email, verificationToken } = user;
  sendEmail(email, verificationToken);
  res
    .status(200)
    .json({ code: 200, message: `Verification sent to email: ${email}` });
};

module.exports = resendVerify;
