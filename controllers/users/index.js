const signin = require("./signin");
const signup = require("./signup");
const getCurrent = require("./getCurent");
const logout = require("./logout");
const updateUser = require("./updateUser");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signup,
  signin,
  getCurrent,
  logout,
  updateUser,
  updateAvatar,
};
