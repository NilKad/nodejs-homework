const { User } = require("../../models");

const logout = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({ code: 204, status: "Logout success" });
};

module.exports = logout;
